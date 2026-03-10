import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScannedItem } from '../types';

interface ScannedItemCardProps {
    item: ScannedItem;
    isLocked: boolean;
    onEdit: (item: ScannedItem) => void;
    onRemove: (code: string) => void;
}

const ScannedItemCard = React.memo(({ item, isLocked, onEdit, onRemove }: ScannedItemCardProps) => {
    return (
        <View style={styles.itemCard}>
            <TouchableOpacity
                style={styles.quantityContainer}
                disabled={isLocked}
                onPress={() => onEdit(item)}
            >
                <Text style={styles.quantityValue}>{item.quantity}</Text>
                <Text style={styles.quantityLabel}>QTD</Text>
            </TouchableOpacity>

            <View style={styles.itemInfo}>
                <Text style={styles.itemCode}>{item.code}</Text>
                <Text style={styles.itemDate}>
                    {new Date(item.lastScannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>

            <TouchableOpacity
                disabled={isLocked}
                onPress={() => {
                    Alert.alert("Remover Item", `Deseja remover o item ${item.code}?`, [
                        { text: "Manter", style: "cancel" },
                        { text: "Remover", style: "destructive", onPress: () => onRemove(item.code) }
                    ])
                }}
                style={[styles.deleteButton, isLocked && { opacity: 0 }]}
            >
                <Ionicons name="close" size={20} color="#EF4444" />
            </TouchableOpacity>
        </View>
    );
});

ScannedItemCard.displayName = 'ScannedItemCard';

export default ScannedItemCard;

const styles = StyleSheet.create({
    itemCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    itemInfo: {
        flex: 1,
    },
    itemCode: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 2,
    },
    itemDate: {
        fontSize: 11,
        color: '#94A3B8',
    },
    quantityContainer: {
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 12,
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#4F46E5',
    },
    quantityLabel: {
        fontSize: 9,
        color: '#4F46E5',
        fontWeight: '700',
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FEF2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
