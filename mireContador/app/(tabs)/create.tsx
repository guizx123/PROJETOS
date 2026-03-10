import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useStore } from '../../src/store/useStore';
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen() {
    const router = useRouter();
    const { createBalance } = useStore();
    const [name, setName] = useState('');

    const handleCreate = async () => {
        if (!name.trim()) {
            Alert.alert("Erro", "Nome não pode ser vazio");
            return;
        }

        // The store already sets activeBalanceId, but we need the ID to navigate
        await createBalance(name);
        const newStoreState = useStore.getState();
        const createdId = newStoreState.activeBalanceId;

        if (createdId) {
            setName('');
            router.push(`/balance/${createdId}`);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, backgroundColor: '#F8FAFC' }}
        >
            <Stack.Screen options={{ title: 'Novo' }} />
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="add-circle" size={40} color="#4F46E5" />
                    </View>
                    <Text style={styles.title}>Novo Inventário</Text>
                    <Text style={styles.subtitle}>Defina um nome para começar a bipar os itens do seu estoque.</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.label}>Nome do Inventário</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="create-outline" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Loja Centro - Fev/26"
                            placeholderTextColor="#94A3B8"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleCreate}>
                        <Text style={styles.buttonText}>Confirmar e Iniciar</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    content: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
    },
    label: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#4F46E5',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
    }
});
