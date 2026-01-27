import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "black",
    },
    scrollView: {
        flex: 1,
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a1a",
        width: "90%",
        borderRadius: 8,
        padding: 20,
        minHeight: 550,
        marginTop: 20,
        marginBottom: 20,

    },
    header: {
        width: "100%",
        paddingHorizontal: 15,
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 80,
        resizeMode: "contain",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        marginTop: 20,
    },
    input: {
        width: "90%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: "black",
        marginTop: 10,
    },
    button: {
        width: "90%",
        height: 50,
        backgroundColor: "red",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        gap: 10,
        marginBottom: 10,
        marginTop: 20,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 5,
    },
    checkboxText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
    },
    textLink: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        gap: 10,
        marginBottom: 10,
        marginTop: 10,
    },
});