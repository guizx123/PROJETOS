import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    closeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -110, // Half of height (220)
        marginLeft: -(Math.min(width * 0.75, 300) / 2), // Half of width
        width: Math.min(width * 0.75, 300),
        height: 220,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 24,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 5,
    },
    marker: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    markerLine: {
        position: 'absolute',
        width: '90%',
        height: 2,
        backgroundColor: '#EF4444',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    helpText: {
        position: 'absolute',
        bottom: 80,
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: '500',
    },
    feedbackContainer: {
        position: 'absolute',
        bottom: 80,
        backgroundColor: '#10B981',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    feedbackText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
