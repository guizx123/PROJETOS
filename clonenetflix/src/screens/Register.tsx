import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from './Styles/SRegister'
import { useNavigation } from '@react-navigation/native'



type props = {
    navigation: any;
}

export default function Register({ navigation }: props) {
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
        if (!email.includes('@') || !email.includes('.')) {
            alert('Email invalido');
            return;
        }
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Image source={require('../../assets/images/netflix-logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Crie sua conta</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.text}>Preencha seu nome: </Text>
                        <TextInput style={styles.input} placeholder="Nome"
                            value={nome}
                            onChangeText={setNome} />
                        <Text style={styles.text}>Preencha seu email: </Text>
                        <TextInput style={styles.input} placeholder="Email"
                            value={email}
                            onChangeText={setEmail} />
                        <Text style={styles.text}>Preencha sua senha: </Text>
                        <TextInput style={styles.input} placeholder="Senha"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha} />
                        <Text style={styles.text}>Confirmar Senha: </Text>
                        <TextInput style={styles.input} placeholder="Confirmar Senha"
                            secureTextEntry={true}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha} />
                        <TouchableOpacity style={styles.button} onPress={() => Validador()}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <Text style={styles.textLink}
                            onPress={() => navigation.navigate('Login')}
                        >Voltar</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}