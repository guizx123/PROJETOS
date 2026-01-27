import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView } from "react-native";
import { styles } from './Styles/SPassword';


type Props = {
    navigation: any;
}

export default function Password({ navigation }: Props) {

    const [selection, setSelection] = React.useState<'email' | 'phone' | null>(null);
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    function Validador() {
        if (email != "") {
            setMessage('Email enviado com sucesso');
            return;
        }

        setMessage('');
        setSelection(null);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}  >
                    <Image source={require('../../assets/images/netflix-logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Esqueci meu Email/Senha</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.text}>Como você deseja redefinir sua senha?</Text>

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={selection === 'email'}
                                onValueChange={() => setSelection(selection === 'email' ? null : 'email')}
                            />
                            <Text style={styles.checkboxText}>Por email</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={selection === 'phone'}
                                onValueChange={() => setSelection(selection === 'phone' ? null : 'phone')}
                            />
                            <Text style={styles.checkboxText}>Por telefone</Text>
                        </View>

                        <Text style={styles.text}>Digite seu email cadastrado:</Text>
                        <TextInput style={styles.input} onChangeText={setEmail} value={email}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={Validador}><Text style={styles.buttonText}>Enviar</Text></TouchableOpacity>
                        <Text style={styles.text}>{message}</Text>
                        <Text style={styles.textLink}
                            onPress={() => navigation.navigate('Login')}
                        >Voltar</Text>
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView>
    );
}