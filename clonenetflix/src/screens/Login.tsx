import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import Form from "../components/Form/Form";
import { styles } from "./SLogin";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  function loginSucess() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Perfil' as never }],
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerArea}>
          <Image
            source={require("../../assets/images/netflix-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formArea}>
          <Form onSuccess={loginSucess} />
        </View>
      </View>
    </SafeAreaView>
  );
}