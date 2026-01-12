import { ImageBackground, Text, View } from "react-native";
import { styles } from "./SFeatureMovie";

export default function FeaturedMovie() {
  return (
    <ImageBackground
      source={{
        uri: "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
      }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.movieTitle}>Stranger Things</Text>
      </View>
    </ImageBackground>
  );
}