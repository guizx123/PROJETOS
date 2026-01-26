import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'


export default function App() {

    const [contador, setContador] = useState(0)
    return (
        <View style={styles.container}>
            <Text>{contador}</Text>
            <TouchableOpacity style={styles.button}
                onPress={() => setContador(contador + 1)}>
                <Text>Contar</Text>
            </TouchableOpacity>
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },

})