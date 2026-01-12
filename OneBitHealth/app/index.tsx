import React from "react";
import { View } from "react-native";
import Title from "@/src/components/Title/Title";
import Main from "@/src/components/Main/Main"
import  {styles}  from "./Style";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Title/>
      <Main/>
    </View>
  );
}
