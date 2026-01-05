import React from "react";
import { Text, View } from "react-native";
import {styles} from './STitle'

export default function Title() {
  return (
    <View style= {styles.boxTitle}>
      <Text style={styles.title}>ONEBITHEALTH</Text>
    </View>
  );
}
