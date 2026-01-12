import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 450, // Aumentei um pouco para ficar mais imponente
        justifyContent: "flex-end",
        width: "98%",
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
        marginLeft: 10,
    },
    backgroundImage: {
        borderRadius: 20,
    },
    infoContainer: {
        padding: 20,
    },
    movieTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        alignItems: "center",
    }
});