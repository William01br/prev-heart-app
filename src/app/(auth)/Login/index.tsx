import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";

import { AuthContainer } from "@/components/authContainer";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Title } from "@/components/title";
import { PasswordInput } from "@/components/input/PasswordInput";
import { tintColorLightBlue } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/utils/types/Role";
import { ErrorMessage } from "@/utils/types/ErrorMessage";

const credentialsSchema = z.object({
  cpf: z.string().trim().length(11, "CPF deve ter 11 caracteres"),
  password: z.string().trim().min(1, "Senha é obrigatória"),
});

export default function Index() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [errorCpf, setErrorCpf] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  const handleCpf = (cpf: string) => setCpf(cpf);
  const handlePassword = (password: string) => setPassword(password);

  const handleLogin = async () => {
    try {
      setErrorCpf(null);
      setErrorPassword(null);
      setErrorGeneral(null);

      const result = credentialsSchema.safeParse({ cpf, password });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          if (issue.path[0] === "cpf") setErrorCpf(issue.message);
          if (issue.path[0] === "password") setErrorPassword(issue.message);
        });
        return;
      }

      const request: Role | ErrorMessage = await signIn({ cpf, password });

      if (typeof request === "object") {
        setErrorGeneral(request.error);
        return;
      }

      // Request is Enum: 'caregiver' | 'elder'
      if (request === "caregiver") router.replace("/(caregiver)/(withNavBar)");
      else if (request === "elder") router.replace("/(elder)/(withNavBar)");
      else router.replace("/(auth)/Login");
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AuthContainer>
        <Title>Login</Title>
        <View style={{ height: 30 }}></View>

        <Text style={styles.textInput}>CPF:</Text>
        <Input
          placeholder="CPF"
          value={cpf}
          onChangeText={handleCpf}
          keyboardType="numeric"
        />
        {errorCpf && <Text style={styles.error}>{errorCpf}</Text>}

        <Text style={styles.textInput}>Senha:</Text>
        <PasswordInput value={password} onChangeText={handlePassword} />
        {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
        {errorGeneral && <Text style={styles.error}>{errorGeneral}</Text>}

        <View style={{ height: 20 }}></View>
        <Button title="Login" onPress={handleLogin} />
        <View style={{ height: 30 }}></View>

        <View style={styles.containerTextButton}>
          <Text style={styles.text}>Não possui uma conta? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.navigate("/Register/RegisterRoleCredentials")}
          >
            <Text style={styles.textButton}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </AuthContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  textInput: { marginBottom: -10, alignSelf: "flex-start" },
  error: {
    color: "red",
    marginTop: -10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
