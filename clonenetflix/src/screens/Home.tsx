import { ScrollView, View } from "react-native";
import Bottom from "../components/Bottom/Bottom";
import FeaturedMovie from "../components/FeatureMovie/FeatureMovie";
import Header from "../components/header/Header";
import MovieRow from "../components/movieRow/MovieRow";
import { categories } from "../data/Movie";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <Header />
      <ScrollView>
        <FeaturedMovie />
        {categories.map((category) => (
          <MovieRow
            key={category.title}
            title={category.title}
            movies={category.movies}
          />
        ))}
      </ScrollView>
      <Bottom />
    </View>
  );
}