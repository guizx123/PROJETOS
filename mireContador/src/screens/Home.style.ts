import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    stats: {
        flexDirection: 'row',
        gap: 20,
    },
    statText: {
        color: '#bdc3c7',
        fontWeight: '600',
    },
    list: {
        padding: 16,
        paddingBottom: 100,
    },
    itemCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemCode: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34495e',
    },
    itemDate: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    quantityContainer: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    quantityLabel: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    quantityValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#27ae60',
    },
    deleteButton: {
        padding: 10,
    },
    deleteText: {
        color: '#e74c3c',
        fontWeight: 'bold'
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#95a5a6',
        marginBottom: 8,
    },
    emptySubText: {
        color: '#bdc3c7',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20, // Leave space for FAB? No, FAB is over it.
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 120, // Space for FAB
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearButton: {
        backgroundColor: '#e74c3c',
        marginRight: 10,
    },
    exportButton: {
        backgroundColor: '#27ae60',
        flex: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
