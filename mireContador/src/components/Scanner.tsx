import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { styles } from './Scanner.style';

interface ScannerProps {
    onScan: (code: string) => void;
    onClose: () => void;
}

export default function Scanner({ onScan, onClose }: ScannerProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    if (!permission) {
        // Permission state is loading
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
                    Precisamos de permissão para usar a câmera
                </Text>
                <Button onPress={requestPermission} title="Conceder Permissão" />
                <Button onPress={onClose} title="Voltar" color="red" />
            </View>
        );
    }

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);
        onScan(data);
        // Add a small delay safely to allow scanning again if needed, 
        // but in this flow we usually scan one and the parent plays sound/handles logic
        // We'll reset scanned state after a short delay to prevent double reads
        setTimeout(() => setScanned(false), 1500);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "qr", "upc_a", "code128"],
                }}
            >
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </TouchableOpacity>
                    <View style={styles.markerContainer}>
                        <View style={styles.marker} />
                    </View>
                    <Text style={styles.helpText}>Aponte para o código de barras</Text>
                </View>
            </CameraView>
        </View>
    );
}


