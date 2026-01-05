import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { styles } from "./SMovieRow"
import { Movie } from "@/src/data/Movie";


type Props = {
    title: string
    movies: Movie[]
}

export default function MovieRow({ title, movies }: Props) {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}