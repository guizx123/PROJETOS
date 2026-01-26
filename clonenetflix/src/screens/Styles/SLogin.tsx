import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  headerArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formArea: {
    flex: 3,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 100,
  }
});