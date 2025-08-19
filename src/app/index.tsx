import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { AuthContainer } from "@/components/authContainer";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Title } from "../components/title";
import { PasswordInput } from "@/components/input/PasswordInput";
import { tintColorLightBlue } from "@/constants/Colors";

export default function Index() {
  function handleMessage() {
    return Alert.alert("Hey!");
  }
  return (
    <AuthContainer>
      <Title>Login</Title>

      <Input placeholder="CPF" />
      <PasswordInput />

      <Button title="Login" onPress={handleMessage} />

      <View style={styles.containerTextButton}>
        <Text style={styles.text}>Não possui uma conta? </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.navigate("/Register/RegisterRoleScreen")}
        >
          <Text style={styles.textButton}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    // gap: 16,
  },
  containerTextButton: {
    flexDirection: "row",
  },
  text: {
    color: "#000",
    fontSize: 14,
    paddingRight: 2,
  },
  textButton: {
    color: tintColorLightBlue,
    fontSize: 15,
    fontWeight: "bold",
  },
});
