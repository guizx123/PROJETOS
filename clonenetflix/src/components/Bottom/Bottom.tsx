import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './SBottom';
import { Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons';

export default function Bottom() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Foundation name="home" size={24} color="white" />
                <Text style={styles.text}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Ionicons name="game-controller-outline" size={24} color="#8c8c8c" />
                <Text style={styles.text}>Jogos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="movie-play-outline" size={24} color="#8c8c8c" />
                <Text style={styles.text}>Novidades</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" }}
                    style={{ width: 24, height: 24, borderRadius: 4 }}
                />
                <Text style={styles.text}>Minha Netflix</Text>
            </TouchableOpacity>
        </View>
    );
}