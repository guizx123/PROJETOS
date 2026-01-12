import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    minWidth: 300,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    height: 50,
    backgroundColor: "grey",
    width: "100%",
    color: "white",
  },
  Button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "red",
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  TextButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  Text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },
  contentContainer: {
    width: "85%",
  },
});