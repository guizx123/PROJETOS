import { View, ScrollView } from "react-native";
import Header from "../components/header/Header";
import FeaturedMovie from "../components/FeatureMovie/FeatureMovie";
import { categories } from "../data/Movie";
import MovieRow from "../components/movieRow/MovieRow";
import Bottom from "../components/Bottom/Bottom";

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