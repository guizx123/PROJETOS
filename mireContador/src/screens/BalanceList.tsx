import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store/useStore';
import { styles } from './BalanceList.style';

export default function BalanceList() {
    const router = useRouter();
    const { balances, createBalance, deleteBalance, setActiveBalance } = useStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newBalanceName, setNewBalanceName] = useState('');

    const handleCreate = () => {
        if (!newBalanceName.trim()) {
            Alert.alert("Erro", "Nome não pode ser vazio");
            return;
        }
        createBalance(newBalanceName);
        setNewBalanceName('');
        setIsModalVisible(false);
    };

    const handleOpenBalance = (id: string, name: string) => {
        setActiveBalance(id);
        router.push({ pathname: "/balance/[id]", params: { id, title: name } });
    };

    const handleDelete = (id: string) => {
        Alert.alert("Excluir", "Tem certeza? Isso apagará todos os itens deste balanço.", [
            { text: "Cancelar", style: "cancel" },
            { text: "Excluir", style: "destructive", onPress: () => deleteBalance(id) }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={balances}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleOpenBalance(item.id, item.name)}
                    >
                        <View style={styles.cardContent}>
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
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteText}>🗑️</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum balanço criado.</Text>
                        <Text style={styles.emptySubText}>Toque no + para começar.</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Balanço</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome (ex: Estoque Loja 1)"
                            value={newBalanceName}
                            onChangeText={setNewBalanceName}
                            autoFocus
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleCreate}
                            >
                                <Text style={styles.buttonText}>Criar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
