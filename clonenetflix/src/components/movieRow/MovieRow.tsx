import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./SMovieRow";
import { Movie } from "@/src/data/Movie";

type Props = {
  title: string;
  movies: Movie[];
};

export default function MovieRow({ title, movies }: Props) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.poster}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}