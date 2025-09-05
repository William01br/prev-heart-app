import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, Stack } from "expo-router";

import { AuthContainer } from "@/components/authContainer";
import { Title } from "@/components/title";
import { Input } from "@/components/input";
import { PasswordInput } from "@/components/input/PasswordInput";
import { Button } from "@/components/button";
import { useFormData } from "@/contexts/FormDataContent";

const credentialsSchema = z
  .object({
    cpf: z.string().trim().length(11, "O CPF deve ser válido."),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "A senha deve possuir, no mínimo, 8 dígitos; dentre eles: letras minúsculas, maiúsculas e números."
      ),
    confirmPassword: z.string().min(8, "As senhas devem ser iguais."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormDataCredentials = z.infer<typeof credentialsSchema>;

export default function RegisterCredentialsScreen() {
  const { updateFormData } = useFormData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataCredentials>({
    resolver: zodResolver(credentialsSchema),
  });

  const onSubmit = (data: FormDataCredentials) => {
    updateFormData(data);
    router.push("/Register/RegisterProfileScreen");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Etapa 2" }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <AuthContainer>
            <Title>Preencha com cuidado!</Title>
            <View style={{ height: 30 }}></View>

            <Controller
              control={control}
              name="cpf"
              rules={{ required: "CPF é obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.text}>CPF:</Text>
                  <Input
                    placeholder="CPF"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                  {errors.cpf && (
                    <Text style={styles.error}>
                      Por favor, preencha CPF corretamente.
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
                  <Text style={styles.text}>Senha:</Text>
                  <PasswordInput value={value} onChangeText={onChange} />
                  {errors.password && (
                    <Text style={styles.error}>
                      A senha deve conter, pelo menos, 8 caracteres, dentre
                      eles: letras minúsculas, maiúsculas e números.
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.text}>Confirme a senha:</Text>
                  <PasswordInput
                    placeholder="Confirme a senha"
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.error}>As senhas devem coincidir.</Text>
                  )}
                </>
              )}
            />

            <View style={{ height: 20 }}></View>
            <Button title="Continuar" onPress={handleSubmit(onSubmit)} />
          </AuthContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  text: { marginBottom: -10, alignSelf: "flex-start" },
  error: {
    color: "red",
    marginTop: -10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
