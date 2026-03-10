import React, { useState, useCallback, useMemo } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import Scanner from '../components/Scanner';
import ScannedItemCard from '../components/ScannedItemCard';
import { exportToExcel, shareAsText } from '../utils/excelGenerator';
import { styles } from './Home.style';
import { ScannedItem } from '../types';

export default function Collection() {
    const { } = useLocalSearchParams();
    const activeBalanceId = useStore(state => state.activeBalanceId);

    const activeBalance = useStore(state =>
        state.balances.find(b => b.id === activeBalanceId));

    const clearCurrentBalance = useStore(state => state.clearCurrentBalance);
    const removeItem = useStore(state => state.removeItem);
    const updateItemQuantity = useStore(state => state.updateItemQuantity);

    const [isScanning, setIsScanning] = useState(false);
    const [editingItem, setEditingItem] = useState<{ code: string, quantity: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const insets = useSafeAreaInsets();
    const bottomPadding = Math.max(insets.bottom, 20);

    const handleEdit = useCallback((item: { code: string, quantity: number }) => {
        setEditingItem({ code: item.code, quantity: item.quantity.toString() });
    }, []);

    const saveQuantity = useCallback(async () => {
        if (!editingItem) return;
        const newQty = parseInt(editingItem.quantity);
        if (!isNaN(newQty) && newQty >= 0) {
            await updateItemQuantity(editingItem.code, newQty);
        }
        setEditingItem(null);
    }, [editingItem, updateItemQuantity]);

    const handleScan = useCallback((code: string) => {
        const state = useStore.getState();
        const currentBalance = state.balances.find(b => b.id === state.activeBalanceId);

        if (!currentBalance) return;
        const currentIsLocked = currentBalance.status === 'completed' || currentBalance.status === 'canceled';

        if (currentIsLocked) {
            Alert.alert("Bloqueado", "Este balanço já foi finalizado ou cancelado.");
            setIsScanning(false);
            return;
        }

        state.addItem(code);
    }, []);

    const handleCloseScanner = useCallback(() => {
        setIsScanning(false);
    }, []);

    const isLocked = useMemo(() =>
        activeBalance?.status === 'completed' || activeBalance?.status === 'canceled',
        [activeBalance?.status]);

    const statusLabel = useMemo(() =>
        activeBalance?.status === 'completed' ? 'CONCLUÍDO' : activeBalance?.status === 'canceled' ? 'CANCELADO' : '',
        [activeBalance?.status]);

    const allItems = useMemo(() => activeBalance?.items || [], [activeBalance?.items]);

    const renderItem = useCallback(({ item }: { item: ScannedItem }) => (
        <ScannedItemCard
            item={item}
            isLocked={isLocked}
            onEdit={handleEdit}
            onRemove={removeItem}
        />
    ), [isLocked, handleEdit, removeItem]);

    const getItemLayout = useCallback((_data: any, index: number) => ({
        length: 84,
        offset: 84 * index,
        index,
    }), []);

    const filteredItems = useMemo(() => {
        if (!searchQuery) return allItems;
        const query = searchQuery.toLowerCase();
        return allItems.filter(item => item.code.toLowerCase().includes(query));
    }, [allItems, searchQuery]);

    if (!activeBalance) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                <Text style={{ color: '#64748B' }}>Carregando balanço...</Text>
            </View>
        );
    }

    const handleExport = async () => {
        if (allItems.length === 0) {
            Alert.alert("Vazio", "Nenhum item para exportar.");
            return;
        }

        Alert.alert(
            "Exportar Dados",
            "Escolha o formato de saída:",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "📄 Texto Simplificado",
                    onPress: async () => { await shareAsText(allItems, activeBalance?.name || ""); }
                },
                {
                    text: "📊 Planilha Excel",
                    onPress: async () => { await exportToExcel(allItems, activeBalance?.name || ""); }
                }
            ]
        );
    };

    const totalItems = allItems.length;
    const totalQuantity = allItems.reduce((acc: number, curr: any) => acc + curr.quantity, 0);

    return (
        <View style={styles.container}>
            <Modal
                visible={isScanning}
                animationType="fade"
                onRequestClose={handleCloseScanner}
            >
                <Scanner onScan={handleScan} onClose={handleCloseScanner} />
            </Modal>

            <View style={styles.header}>
                <View style={styles.stats}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Códigos</Text>
                        <Text style={styles.statValue}>{totalItems}</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Total Peças</Text>
                        <Text style={[styles.statValue, { color: '#4F46E5' }]}>{totalQuantity}</Text>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, isLocked && { opacity: 0.5 }]}
                        disabled={isLocked}
                        onPress={() => {
                            Alert.alert("Limpar Balanço", "Tem certeza que deseja remover todos os itens coletados?", [
                                { text: "Cancelar", style: "cancel" },
                                { text: "Sim, Zerar", style: "destructive", onPress: clearCurrentBalance }
                            ])
                        }}
                    >
                        <Ionicons name="trash-outline" size={18} color="#EF4444" />
                        <Text style={[styles.actionText, { color: '#EF4444' }]}>Zerar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4F46E5', borderColor: '#4F46E5' }]} onPress={handleExport}>
                        <Ionicons name="share-outline" size={18} color="white" />
                        <Text style={[styles.actionText, { color: 'white' }]}>Exportar</Text>
                    </TouchableOpacity>
                </View>

                {isLocked && (
                    <View style={[styles.statusIndicator, { backgroundColor: activeBalance.status === 'completed' ? '#16A34A' : '#DC2626' }]}>
                        <Text style={styles.statusIndicatorText}>
                            BALANÇO {statusLabel} - MODO LEITURA
                        </Text>
                    </View>
                )}
            </View>

            {allItems.length > 5 && (
                <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        height: 44,
                        borderWidth: 1,
                        borderColor: '#E2E8F0'
                    }}>
                        <Ionicons name="search" size={18} color="#94A3B8" />
                        <TextInput
                            placeholder="Buscar código..."
                            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#1E293B' }}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCorrect={false}
                        />
                        {searchQuery !== '' && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                contentContainerStyle={[styles.list, { paddingBottom: 140 }]}
                getItemLayout={getItemLayout}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={Platform.OS === 'android'}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="barcode-outline" size={80} color="#CBD5E1" />
                        <Text style={styles.emptyText}>Lista Vazia</Text>
                        <Text style={styles.emptySubText}>Toque no botão abaixo para escanear.</Text>
                    </View>
                }
            />

            {!isLocked && (
                <TouchableOpacity
                    style={styles.scanButton}
                    activeOpacity={0.9}
                    onPress={() => setIsScanning(true)}
                >
                    <Ionicons name="camera" size={28} color="white" />
                    <Text style={styles.scanButtonText}>ESCANEAR AGORA</Text>
                </TouchableOpacity>
            )}

            {editingItem && (
                <Modal
                    visible={!!editingItem}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setEditingItem(null)}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "padding"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
                        style={styles.modalOverlay}
                    >
                        <View style={[styles.modalContent, { paddingBottom: 30 + bottomPadding }]}>
                            <View style={{ width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 }} />
                            <Text style={styles.modalTitle}>Editar Quantidade</Text>
                            <Text style={{ textAlign: 'center', marginBottom: 20, color: '#64748B' }}>Código: {editingItem.code}</Text>

                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={editingItem.quantity}
                                onChangeText={(text) => setEditingItem({ ...editingItem, quantity: text })}
                                autoFocus
                                selectTextOnFocus
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditingItem(null)}>
                                    <Text style={[styles.buttonText, { color: '#64748B' }]}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={saveQuantity}>
                                    <Text style={[styles.buttonText, { color: 'white' }]}>Atualizar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            )}
        </View>
    );
}
