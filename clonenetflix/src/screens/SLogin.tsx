import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start", // Começa do topo
    paddingTop: 50, // Dá um espaço para o Header não colar no topo
  },
  headerArea: {
    flex: 1, // Zona do Header (ocupa 1 parte)
    width: "100%",
    justifyContent: "center", // Centraliza o Header na zona dele
    alignItems: "center",
  },
  formArea: {
    flex: 3, // Zona do Formulário (ocupa 3 partes, ou seja, é maior)
    width: "100%",
    justifyContent: "flex-start", // Começa do topo da zona dele
    alignItems: "center",
  },
});