import { Text, View } from "react-native";
import { router } from "expo-router";

import { BackButton } from "@/components/button/BackButton";
import { AuthContainer } from "@/components/authContainer";
import { Title } from "@/components/title";
import { Input } from "@/components/input";
import { PasswordInput } from "@/components/input/PasswordInput";
import { Button } from "@/components/button";

export default function RegisterCredentialsScreen() {
  return (
    <View style={{ flex: 0.9 }}>
      <BackButton
        onPress={() => router.navigate("/Register/RegisterRoleScreen")}
      />
      <AuthContainer>
        <Title>Cadastro</Title>
        <Input placeholder="CPF" />
        <PasswordInput />
        <PasswordInput placeholder="Confirme a senha" />
        <Button title="Continuar" />
      </AuthContainer>
    </View>
  );
}
