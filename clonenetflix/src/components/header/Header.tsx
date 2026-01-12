import { View, Image } from "react-native";
import { styles } from "./Sheader";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/netflix-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}