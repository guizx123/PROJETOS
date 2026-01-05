import React from "react";
import { Text, View } from "react-native";
import { styles } from './SResultImc'

interface ResultImcProps {
  messageResultImc: string;
  ResultImc: string;
}
export default function ResultImc({ messageResultImc, ResultImc }: ResultImcProps) {
  return (
    <View style={styles.form}>
      <Text style={styles.Texto}>{messageResultImc} {ResultImc}</Text>


    </View>
  );
}
