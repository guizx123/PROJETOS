import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { audioService } from '../services/audio';
import { styles } from './Scanner.style';

interface ScannerProps {
    onScan: (code: string) => void;
    onClose: () => void;
}

const Scanner = React.memo(({ onScan, onClose }: ScannerProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const lastCodeRef = React.useRef<string | null>(null);
    const lastTimeRef = React.useRef<number>(0);
    const isReadyRef = React.useRef<boolean>(true);
    const [feedbackText, setFeedbackText] = useState('');

    const scanBufferRef = React.useRef<string[]>([]); // Buffer for Consensus Logic

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
        // Preload audio disabled by user request
        // audioService.init();

        return () => {
            // Cleanup: Optional, based on if we want to release audio RAM immediately
            // audioService.unload();
        };
    }, [permission, requestPermission]);

    const normalizeCode = (code: string) => {
        // Retail barcodes often have leading zeros depending on the sensor (UPC vs EAN)
        // We trim whitespace and remove leading zeros for internal consistency
        const clean = code.trim().replace(/^0+/, '');
        return clean || "0"; // Don't return empty
    };

    const handleBarcodeScanned = useCallback((result: BarcodeScanningResult) => {
        if (!isReadyRef.current) return;

        const { data: rawData } = result;
        if (!rawData) return;

        const data = normalizeCode(rawData);
        // Ignore very short noise (most barcodes are at least 8 digits EAN-8)
        if (data.length < 4) return;

        // Consensus Logic: Add to buffer
        scanBufferRef.current.push(data);
        if (scanBufferRef.current.length > 12) { // 12 frame window
            scanBufferRef.current.shift();
        }

        // Check for Consensus: Do we have high confidence?
        const matches = scanBufferRef.current.filter(c => c === data).length;
        if (matches < 9) { // 75% consensus inside the window
            return;
        }

        // Reset buffer once confirmed
        scanBufferRef.current = [];

        const now = Date.now();
        const lastCode = lastCodeRef.current;
        const lastTime = lastTimeRef.current;

        // Smart Debounce Logic
        const isSameCode = lastCode === data;
        const timeDiff = now - lastTime;

        if (isSameCode && timeDiff < 2000) return;
        if (!isSameCode && timeDiff < 800) return;

        // Lock processing
        isReadyRef.current = false;
        lastCodeRef.current = data;
        lastTimeRef.current = now;

        // Haptic Feedback (Auditory removed by user request)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        setFeedbackText(`Lido: ${data}`);

        setTimeout(() => {
            onScan(data);

            setTimeout(() => {
                isReadyRef.current = true;
            }, 600);
        }, 16);

    }, [onScan]);

    useEffect(() => {
        if (feedbackText) {
            const timer = setTimeout(() => setFeedbackText(''), 1500);
            return () => clearTimeout(timer);
        }
    }, [feedbackText]);

    const scannerSettings = useMemo(() => ({
        barcodeTypes: [
            "ean13", "ean8", "upc_a", "upc_e", "itf14"
        ] as any[],
    }), []);

    if (!permission) return <View style={styles.container} />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
                    Precisamos de permissão para usar a câmera
                </Text>
                <TouchableOpacity style={[styles.closeButton, { position: 'relative', top: 0, right: 0, marginBottom: 10 }]} onPress={requestPermission}>
                    <Text style={styles.closeText}>Conceder Permissão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.closeButton, { position: 'relative', top: 0, right: 0, backgroundColor: '#EF4444' }]} onPress={onClose}>
                    <Text style={styles.closeText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Background Camera Layer */}
            <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={scannerSettings}
            />

            {/* Sibling UI Layer - Fixed and Stable */}
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close" size={26} color="white" />
                </TouchableOpacity>

                <View style={styles.markerContainer}>
                    <View style={styles.marker} />
                    {/* Fixed Guia Line from Style */}
                    <View style={styles.markerLine} />
                </View>

                {feedbackText ? (
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>{feedbackText}</Text>
                    </View>
                ) : (
                    <Text style={styles.helpText}>Aponte para o código de barras</Text>
                )}
            </View>
        </View>
    );
});

Scanner.displayName = 'Scanner';

export default Scanner;


