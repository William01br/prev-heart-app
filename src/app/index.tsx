import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from "../components/button";
import { Input } from "../components/input";
import Title from "../components/title";
import PasswordInput from "@/components/input/PasswordInput";

export default function Index() {
  function handleMessage() {
    return Alert.alert("Hey!");
  }
  return (
    <View style={styles.container}>
      <Title>Login</Title>

      <Input placeholder="CPF" />
      <PasswordInput />

      <Button title="Continuar" onPress={handleMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    color: "blue",
    fontSize: 24,
    fontWeight: "bold",
  },
});
