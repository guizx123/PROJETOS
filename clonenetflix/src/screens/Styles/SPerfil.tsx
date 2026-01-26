import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: 50,
        marginBottom: 20,
    },
    editButton: {
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    editButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 30,
        textAlign: "center",
    },
    profileContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20,
    },
    profileCard: {
        alignItems: "center",
        width: 90,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 4,
        marginBottom: 10,
    },
    addProfileContainer: {
        width: 90,
        height: 90,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    plusIcon: {
        color: "#ccc",
        fontSize: 40,
        textAlign: "center",
    },
    profileName: {
        color: "#ccc",
        fontSize: 12,
        textAlign: "center",
    },
    textLink: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
    },
});
