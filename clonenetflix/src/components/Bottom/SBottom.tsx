import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: '#121212',
        paddingVertical: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: "#2b2b2b",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#8c8c8c',
        fontSize: 10,
        marginTop: 5,
    },
});