import { StyleSheet, Text, View } from "react-native";

export default function WithoutInformationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você não é responsável por nenhum idoso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
});
