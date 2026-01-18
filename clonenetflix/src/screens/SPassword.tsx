import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({

    container: {
        flex: 2,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
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
    contentContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
        width: "90%",
        borderRadius: 20,
        padding: 20,
        height: "60%",
    },
    input: {
        width: "60%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: "black",
    },
    button: {
        width: "40%",
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
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 20,
    },
    checkboxText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "black",
    },

});