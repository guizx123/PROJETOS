import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useStore } from '../../src/store/useStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import Constants from 'expo-constants';

export default function MainScreen() {
    const { balances } = useStore();
    const router = useRouter();

    const variant = Constants.expoConfig?.extra?.variant;
    const isHomolog = variant === 'homolog';

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: 'Início' }} />
            <View style={styles.content}>
                <View style={styles.topInfo}>
                    {isHomolog && (
                        <View style={styles.hmlBadge}>
                            <Text style={styles.hmlBadgeText}>MODO HOMOLOGAÇÃO</Text>
                        </View>
                    )}
                    <View style={styles.logoContainer}>
                        <Ionicons name="barcode" size={50} color="#4F46E5" />
                    </View>
                    <Text style={styles.title}>Miré Coletor</Text>
                    <Text style={styles.subtitle}>Gerenciamento de estoque inteligente.</Text>
                </View>

                <TouchableOpacity
                    style={styles.dashboard}
                    activeOpacity={0.7}
                    onPress={() => router.push('/(tabs)/list')}
                >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="stats-chart" size={18} color="#4F46E5" />
                            <Text style={styles.cardTitle}>Status Atual</Text>
                        </View>

                        <View style={styles.statRow}>
                            <Text style={styles.statLabel}>Total de Inventários</Text>
                            <Text style={styles.statValue}>{balances.length}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.mainActions}>
                    <TouchableOpacity
                        style={[styles.mainButton, { backgroundColor: '#4F46E5' }]}
                        activeOpacity={0.8}
                        onPress={() => router.push('/(tabs)/create')}
                    >
                        <Ionicons name="add-circle" size={28} color="white" />
                        <Text style={styles.mainButtonText}>Novo Inventário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainButton, { backgroundColor: 'white', borderColor: '#E2E8F0', borderWidth: 1 }]}
                        activeOpacity={0.8}
                        onPress={() => router.push('/(tabs)/list')}
                    >
                        <Ionicons name="layers" size={28} color="#4F46E5" />
                        <Text style={[styles.mainButtonText, { color: '#1E293B' }]}>Ver Meus Balanços</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.versionText}>Versão 2.2.1-Optimized {isHomolog ? '(HML)' : ''}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    topInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1E293B',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
    },
    dashboard: {
        width: '100%',
        marginVertical: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#64748B',
        marginLeft: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 16,
        color: '#475569',
        fontWeight: '600',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#4F46E5',
    },
    mainActions: {
        gap: 16,
        marginBottom: 20,
    },
    mainButton: {
        height: 75,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    mainButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 16,
    },
    footer: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 12,
        color: '#CBD5E1',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    hmlBadge: {
        backgroundColor: '#F59E0B',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 10,
    },
    hmlBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
    }
});
