import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../src/store/useStore';
import { styles } from '../../src/screens/BalanceList.style';
import { Balance } from '../../src/types';

export default function ListScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const bottomPadding = Math.max(insets.bottom, 20);
    const { balances, deleteBalance, setActiveBalance, updateBalanceStatus } = useStore();

    const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleOpenBalance = (id: string, name: string) => {
        setActiveBalance(id);
        router.push({ pathname: "/balance/[id]", params: { id, title: name } });
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'completed': return { label: 'Concluído', color: styles.statusCompleted, text: styles.statusCompletedText };
            case 'canceled': return { label: 'Cancelado', color: styles.statusCanceled, text: styles.statusCanceledText };
            case 'pending':
            default: return { label: 'Em Andamento', color: styles.statusPending, text: styles.statusPendingText };
        }
    };

    const openMenu = (balance: Balance) => {
        setSelectedBalance(balance);
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setSelectedBalance(null);
        setIsMenuVisible(false);
    };

    const handleStatusUpdate = async (status: Balance['status']) => {
        if (selectedBalance) {
            await updateBalanceStatus(selectedBalance.id, status);
            closeMenu();
        }
    };

    const confirmDelete = () => {
        if (selectedBalance) {
            Alert.alert(
                "Confirmação",
                `Atenção! Isso apagará todos os dados de "${selectedBalance.name}" DE VERDADE. Continuar?`,
                [
                    { text: "Não", style: "cancel" },
                    {
                        text: "Sim, Excluir",
                        style: "destructive",
                        onPress: async () => {
                            await deleteBalance(selectedBalance.id);
                            closeMenu();
                        }
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
            <Stack.Screen options={{ title: 'Balanços' }} />
            <FlatList
                data={balances}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[styles.list, { paddingBottom: 150 }]}
                renderItem={({ item }) => {
                    const statusInfo = getStatusInfo(item.status);
                    return (
                        <TouchableOpacity
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() => handleOpenBalance(item.id, item.name)}
                        >
                            <View style={styles.cardContent}>
                                <View style={[styles.statusBadge, statusInfo.color]}>
                                    <Text style={[styles.statusText, statusInfo.text]}>{statusInfo.label}</Text>
                                </View>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <Text style={styles.cardDate}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </Text>
                                <Text style={styles.cardStats}>
                                    {item.items.length} itens coletados
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => openMenu(item)}
                            >
                                <Ionicons name="ellipsis-vertical" size={20} color="#64748B" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="file-tray-outline" size={60} color="#CBD5E1" />
                        <Text style={styles.emptyText}>Nenhum balanço criado.</Text>
                        <Text style={styles.emptySubText}>Vá na aba &quot;Novo&quot; para criar.</Text>
                    </View>
                }
            />

            <Modal
                visible={isMenuVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeMenu}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={closeMenu}
                >
                    <View style={[styles.modalContent, { paddingBottom: 30 + bottomPadding }]}>
                        <View style={{ width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 }} />
                        <Text style={styles.modalTitle}>Opções do Balanço</Text>
                        <Text style={{ textAlign: 'center', marginBottom: 24, color: '#64748B', fontWeight: '500' }}>
                            {selectedBalance?.name}
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#F0FDF4' }]}
                                onPress={() => handleStatusUpdate('completed')}
                            >
                                <Ionicons name="checkmark-circle-outline" size={20} color="#16A34A" style={{ marginRight: 8 }} />
                                <Text style={[styles.buttonText, { color: '#16A34A' }]}>Marcar como Concluído</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#EEF2FF' }]}
                                onPress={() => handleStatusUpdate('pending')}
                            >
                                <Ionicons name="play-outline" size={20} color="#4F46E5" style={{ marginRight: 8 }} />
                                <Text style={[styles.buttonText, { color: '#4F46E5' }]}>Continuar em Andamento</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#F8FAFC' }]}
                                onPress={() => handleStatusUpdate('canceled')}
                            >
                                <Ionicons name="close-circle-outline" size={20} color="#64748B" style={{ marginRight: 8 }} />
                                <Text style={[styles.buttonText, { color: '#64748B' }]}>Cancelar Balanço</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#FEF2F2', marginTop: 12 }]}
                                onPress={confirmDelete}
                            >
                                <Ionicons name="trash-outline" size={20} color="#DC2626" style={{ marginRight: 8 }} />
                                <Text style={[styles.buttonText, { color: '#DC2626' }]}>EXCLUIR DEFINITIVAMENTE</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton, { marginTop: 12 }]}
                                onPress={closeMenu}
                            >
                                <Text style={styles.buttonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}
