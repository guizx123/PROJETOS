import { ImageBackground, Text, View } from 'react-native'

export default function FeaturedMovie() {
  return (
    <ImageBackground
      source={{ uri: 'https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg' }}
      style={{ height: 400, justifyContent: 'flex-end' }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>
          Stranger Things
        </Text>
      </View>
    </ImageBackground>
  )
}