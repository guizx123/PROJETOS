import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 450, // Aumentei um pouco para ficar mais imponente
        justifyContent: "flex-end",
        width: "98%",
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
    },
    backgroundImage: {
        borderRadius: 20,
    },
    infoContainer: {
        padding: 20,
        alignItems: "center", // Centraliza o bloco de texto horizontalmente
    },
    movieTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    Button: {
        backgroundColor: "red",
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        gap: 10,
    },
});