import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Header from "../components/header/Header";
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
          <Header />
        </View>
        <View style={styles.formArea}>
          <Form onSuccess={loginSucess} />
        </View>
      </View>
    </SafeAreaView>
  );
}