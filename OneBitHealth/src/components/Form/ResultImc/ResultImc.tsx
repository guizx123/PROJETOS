import React from "react";
import { Text, View } from "react-native";
import { styles } from './SResultImc'

interface ResultImcProps {
  messageResultImc: string;
  ResultImc: string;
  value: string;
}
export default function ResultImc({ messageResultImc, ResultImc, value }: ResultImcProps) {
  return (
    <View style={styles.form}>
      <Text style={styles.Texto}>{messageResultImc} {ResultImc}</Text>
      <Text style={styles.Texto}>{value}</Text>


    </View>
  );
}
