import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./SForm";

type FormProps = {
  onSuccess: () => void;
};

export default function Form({ onSuccess }: FormProps) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [login, setLogin] = useState("Preencha os campos");

  function Validador() {
    if (usuario != "" && senha != "") {
      setLogin("Você logou");
      onSuccess();
      setUsuario("");
      setSenha("");

      return;
    }

    setUsuario("");
    setSenha("");
    setLogin("Preencha os campos");
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.Text}>Usuário:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsuario}
          value={usuario}
          maxLength={10}
        />
        <Text style={styles.Text}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSenha}
          value={senha}
          maxLength={10}
          secureTextEntry={true}
          textContentType="password"
        />
        <TouchableOpacity style={styles.Button} onPress={Validador}>
          <Text style={styles.TextButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text>{login}</Text>
    </View>
  );
}