import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./Styles/SPerfil";

const profiles = [
    { id: 1, name: "teste1", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" },
    { id: 2, name: "teste2", image: "https://i.pinimg.com/564x/1b/54/ef/1b54ef69d7a228303a743e85bbc008c9.jpg" },
    { id: 3, name: "teste3", image: "https://i.pinimg.com/564x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg" },
    { id: 4, name: "Adicionar", image: "" },
];

export default function Perfil() {
    const navigation = useNavigation();

    function handleProfileSelect() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' as never }],
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Quem está assistindo?</Text>

                <View style={styles.profileContainer}>
                    {profiles.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.profileCard}
                            onPress={handleProfileSelect}
                            activeOpacity={0.7}
                        >
                            {item.name === "Adicionar" ? (
                                <View style={styles.addProfileContainer}>
                                    <Text style={styles.plusIcon}>+</Text>
                                </View>
                            ) : (
                                <Image source={{ uri: item.image }} style={styles.avatar} />
                            )}
                            <Text style={styles.profileName}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}