import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./Sheader";
import { router } from "expo-router";

type HeaderProps = {
  showLogout?: boolean
}

export default function Header({ showLogout = false }: HeaderProps) {
  return (
    <View style={[
      styles.container,
      { justifyContent: showLogout ? 'space-between' : 'center' }
    ]}>
      <Image
        source={require("../../../assets/images/netflix-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {showLogout && (
        <TouchableOpacity onPress={() => router.replace('/Login')}>
          <Text style={styles.textButton}>Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}