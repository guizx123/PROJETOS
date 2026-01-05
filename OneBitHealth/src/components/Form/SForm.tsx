import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 4,
        backgroundColor: 'white',
        width: '100%',
        minWidth: 300,
        paddingHorizontal: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
    },
    form: {
        overflow: 'scroll',
    },
    texto: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        width: 'auto',
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#f5f5f5'
    },
    button: {
        marginTop: 30,
        backgroundColor: '#a231ecff',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
