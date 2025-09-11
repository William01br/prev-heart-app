import { StyleSheet, View, Text } from "react-native";

export default function ErrorScreen() {
  return (
    <View style={styles.containerError}>
      <Text style={styles.textError}>Algo deu errado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    color: "#000",
    fontSize: 32,
    textAlign: "center",
    fontWeight: "600",
  },
});
