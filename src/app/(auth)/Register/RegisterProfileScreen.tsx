import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import { router, Stack } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContainer } from "@/components/authContainer";
import { Title } from "@/components/title";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useFormData } from "@/contexts/FormDataContent";
import { useForm, Controller } from "react-hook-form";

const profileSchema = z.object({
  email: z.email(),
  name: z.string().trim().min(3).max(100),
  phone: z.string().trim().min(11).max(15),
});

type FormDataProfile = z.infer<typeof profileSchema>;

export default function RegisterProfileScreen() {
  const { updateFormData } = useFormData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProfile>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: FormDataProfile) => {
    updateFormData(data);
    router.push("/");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Etapa 3" }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <AuthContainer>
            <Title>Quase lá...</Title>
            <View style={{ height: 30 }}></View>

            <Controller
              control={control}
              name="email"
              rules={{ required: "E-mail é obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.text}>E-mail:</Text>
                  <Input
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text style={styles.error}>
                      Preencha o E-mail corretamente.
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="name"
              rules={{ required: "Nome é obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.text}>Nome:</Text>
                  <Input
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="name-phone-pad"
                  />
                  {errors.name && (
                    <Text style={styles.error}>
                      Por favor, preencha o nome corretamente.
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{ required: "Telefone é obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.text}>Telefone:</Text>
                  <Input
                    placeholder="Telefone"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                  {errors.phone && (
                    <Text style={styles.error}>
                      Por favor, preencha o campo de telefone corretamente
                    </Text>
                  )}
                </>
              )}
            />
            <View style={{ height: 20 }}></View>
            <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
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
