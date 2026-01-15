import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./Sheader";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/netflix-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.Button}
        onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.textButton}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}