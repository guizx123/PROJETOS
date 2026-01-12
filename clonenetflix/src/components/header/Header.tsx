import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./Sheader";
import { router } from "expo-router";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/netflix-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.Button}
        onPress={() => router.replace('/Login')}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}