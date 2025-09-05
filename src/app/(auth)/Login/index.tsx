import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContainer } from "@/components/authContainer";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Title } from "@/components/title";
import { PasswordInput } from "@/components/input/PasswordInput";
import { tintColorLightBlue } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";

const credentialsSchema = z.object({
  cpf: z.string().trim().length(11, "O CPF deve ser válido"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "A senha deve possuir, no mínimo, 8 dígitos; dentre eles: letras minúsculas, maiúsculas e números."
    ),
});

type FormDataCredentials = z.infer<typeof credentialsSchema>;

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataCredentials>({
    resolver: zodResolver(credentialsSchema),
  });

  const { signIn } = useAuth();
  const router = useRouter();

  async function handleLogin(data: FormDataCredentials) {
    try {
      const role = await signIn(data);

      if (role === "caregiver") router.replace("/(caregiver)");
      else if (role === "elder") router.replace("/(elder)/(withNavBar)");
      else router.replace("/(auth)/Login");
    } catch (err: any) {
      alert(err.message || "Login Error");
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AuthContainer>
        <Title>Login</Title>
        <View style={{ height: 30 }}></View>

        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <>
              <Text style={styles.textInput}>CPF:</Text>
              <Input
                placeholder="CPF"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
              {errors.cpf && (
                <Text style={styles.error}>
                  Por favor, preencha o CPF corretamente.
                </Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <Text style={styles.textInput}>Senha:</Text>
              <PasswordInput value={value} onChangeText={onChange} />
              {errors.password && (
                <Text style={styles.error}>
                  A senha deve conter, pelo menos, 8 caracteres, dentre eles:
                  letras minúsculas, maiúsculas e números.
                </Text>
              )}
            </>
          )}
        />

        <View style={{ height: 20 }}></View>
        <Button title="Login" onPress={handleSubmit(handleLogin)} />
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
