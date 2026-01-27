import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
    },

    contentContainer: {
        backgroundColor: "#1a1a1a",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        width: "80%",
        minHeight: 550,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff",
        fontWeight: "bold",
    },
    logo: {
        width: 120,
        height: 80,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#444",
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 15,
        color: "#fff",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#e50914",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    textLink: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
    },
});