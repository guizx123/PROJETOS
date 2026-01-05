import React from "react";
import { View } from "react-native";


export type Movie = {
    id: number
    image: string
}

export type Category = {
    title: string
    movies: Movie[]
}

export const categories: Category[] = [
    {
        title: 'Em Alta',
        movies: [
            {
                id: 1,
                image: 'https://image.tmdb.org/t/p/w300/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg'
            },
            {
                id: 2,
                image: 'https://image.tmdb.org/t/p/w300/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg'

            }

        ]
    },
    {
        title: 'Originais Netflix',
        movies: [
            {
                id: 3,
                image: 'https://image.tmdb.org/t/p/w300/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg'
            },
            {
                id: 4,
                image: 'https://image.tmdb.org/t/p/w300/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg'

            }

        ]
    },

]