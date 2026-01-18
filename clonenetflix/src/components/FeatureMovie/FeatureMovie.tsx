import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.textButton}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.textButton}>Lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}