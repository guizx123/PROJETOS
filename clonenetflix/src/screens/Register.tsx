import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, } from 'react-native'
import { styles } from './Styles/SRegister'
import { useNavigation } from '@react-navigation/native'

export default function Register() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    function Validador() {
        if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
            alert('Preencha todos os campos');
            return;
        }
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
        });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={require('../../assets/images/netflix-logo.png')} style={styles.logo} />
                <Text style={styles.title}>Crie sua conta</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>Nome</Text>
                    <TextInput style={styles.input} placeholder="Nome"
                        value={nome}
                        onChangeText={setNome} />
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email"
                        value={email}
                        onChangeText={setEmail} />
                    <Text style={styles.text}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha"
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={setSenha} />
                    <Text style={styles.text}>Confirmar Senha</Text>
                    <TextInput style={styles.input} placeholder="Confirmar Senha"
                        secureTextEntry={true}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha} />
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}