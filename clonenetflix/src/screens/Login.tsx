import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import Form from "../components/Form/Form";
import { router } from "expo-router";
import { styles } from "./SLogin";

export default function Login() {
  function loginSucess() {
    router.replace("/Home");
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