import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, SafeAreaView, Vibration, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useStore } from '../store/useStore';
import Scanner from '../components/Scanner';
import { exportToExcel } from '../utils/excelGenerator';
import { styles } from './Home.style'; // Reusing styles is fine for now

export default function Collection() {
    const { id, title } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();

    // Safety check ensure store has active balance if deep linked directly
    const { getActiveBalance, addItem, clearCurrentBalance, removeItem, setActiveBalance } = useStore();
    const activeBalance = getActiveBalance();

    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (title) {
            navigation.setOptions({ title: title as string });
        }
        if (id && (!activeBalance || activeBalance.id !== id)) {
            setActiveBalance(id as string);
        }
    }, [id, title, navigation]);

    if (!activeBalance) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando balanço...</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: 'blue' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const items = activeBalance.items;

    async function playSound() {
        Vibration.vibrate(100);
    }

    const handleScan = (code: string) => {
        addItem(code);
        playSound();
    };

    const handleExport = async () => {
        if (items.length === 0) {
            Alert.alert("Vazio", "Nenhum item para exportar.");
            return;
        }
        try {
            await exportToExcel(items);
        } catch (error) {
            Alert.alert("Erro", "Falha ao exportar excel.");
        }
    };

    const totalItems = items.length;
    const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);

    if (isScanning) {
        return <Scanner onScan={handleScan} onClose={() => setIsScanning(false)} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.stats}>
                    <Text style={styles.statText}>Itens: {totalItems}</Text>
                    <Text style={styles.statText}>Qtd Total: {totalQuantity}</Text>
                </View>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.code}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <View>
                            <Text style={styles.itemCode}>{item.code}</Text>
                            <Text style={styles.itemDate}>{new Date(item.lastScannedAt).toLocaleTimeString()}</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <Text style={styles.quantityLabel}>Qtd:</Text>
                            <Text style={styles.quantityValue}>{item.quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeItem(item.code)} style={styles.deleteButton}>
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Balanço Vazio.</Text>
                        <Text style={styles.emptySubText}>Toque em "Ler Código" para começar.</Text>
                    </View>
                }
            />

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => {
                    Alert.alert("Limpar", "Deseja zerar este balanço?", [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Zerar", style: "destructive", onPress: clearCurrentBalance }
                    ])
                }}>
                    <Text style={styles.buttonText}>Zerar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.exportButton]} onPress={handleExport}>
                    <Text style={styles.buttonText}>Exportar (Excel)</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.fab} onPress={() => setIsScanning(true)}>
                <Text style={styles.fabText}>📷 Ler Código</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
