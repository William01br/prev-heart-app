import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { z } from "zod";

import { Input } from "@/shared/components/input";
import { PasswordInput } from "@/shared/components/input/PasswordInput";
import LoadingIcon from "@/shared/components/icons/loading";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ErrorMessage } from "@/features/auth/types/ErrorMessage";
import { Role } from "@/features/auth/types/Role";

import { COLORS, styles } from "./styles";

const credentialsSchema = z.object({
  email: z.email("Digite um e-mail valido").trim(),
  password: z.string().trim().min(1, "Senha obrigatoria"),
});

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetErrors = () => {
    setErrorEmail(null);
    setErrorPassword(null);
    setErrorGeneral(null);
  };

  const handleProviderPress = (provider: "Apple" | "Google") => {
    Alert.alert(
      `${provider} em breve`,
      `A autenticacao com ${provider} ainda nao esta disponivel nesta versao.`
    );
  };

  const handleRegister = () => {
    router.push("/(auth)/Register/RegisterRoleCredentials");
  };

  const handleLogin = async () => {
    try {
      resetErrors();

      const result = credentialsSchema.safeParse({ email, password });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          if (issue.path[0] === "email") setErrorEmail(issue.message);
          if (issue.path[0] === "password") setErrorPassword(issue.message);
        });
        return;
      }

      setIsLoading(true);

      const request: Role | ErrorMessage = await signIn({ email, password });

      if (typeof request === "object") {
        setErrorGeneral(request.error);
        setIsLoading(false);
        return;
      }

      if (request === "caregiver") {
        router.replace("/(caregiver)/(withNavBar)");
        return;
      }

      if (request === "elder") {
        router.replace("/(elder)/(withNavBar)");
        return;
      }

      router.replace("/(auth)/Login");
    } catch (error) {
      console.error(error);
      setErrorGeneral("Erro interno, tente novamente.");
      setIsLoading(false);
    }
  };

  const BrandHeader = () => (
    <View style={styles.brandBlock}>
      <View style={styles.logoBadge}>
        <FontAwesome name="medkit" size={28} color={COLORS.onPrimary} />
      </View>

      <Text style={styles.brandTitle}>Prev Heart</Text>
      <Text style={styles.brandSubtitle}>Seu santuario clinico</Text>
    </View>
  );

  const SocialButton = ({
    label,
    variant,
    onPress,
  }: {
    label: string;
    variant: "apple" | "google";
    onPress: () => void;
  }) => (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.socialButton,
        variant === "apple" ? styles.appleButton : styles.googleButton,
        pressed && styles.buttonPressed,
      ]}
    >
      {variant === "apple" ? (
        <AntDesign name="apple" size={18} color={COLORS.onPrimary} />
      ) : (
        <AntDesign name="google" size={18} color={COLORS.secondary} />
      )}

      <Text
        style={[
          styles.socialButtonText,
          variant === "apple"
            ? styles.appleButtonText
            : styles.googleButtonText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  const SectionDivider = () => (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>ou cadastre-se com e-mail</Text>
      <View style={styles.dividerLine} />
    </View>
  );

  const CredentialFields = () => {
    if (!showCredentials) {
      return null;
    }

    return (
      <View style={styles.credentialsPanel}>
        <Text style={styles.credentialsTitle}>Entrar com e-mail e senha</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>E-mail</Text>
          <Input
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errorEmail ? (
            <Text style={styles.errorText}>{errorEmail}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Senha</Text>
          <PasswordInput
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          {errorPassword ? (
            <Text style={styles.errorText}>{errorPassword}</Text>
          ) : null}
        </View>

        {errorGeneral ? (
          <Text style={styles.errorText}>{errorGeneral}</Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </Pressable>
      </View>
    );
  };

  const TrustIndicators = () => (
    <View style={styles.trustSection}>
      <View style={styles.trustIconRow}>
        <MaterialIcons name="security" size={24} color={COLORS.primaryMuted} />
        <MaterialIcons
          name="verified-user"
          size={24}
          color={COLORS.primaryMuted}
        />
        <MaterialIcons
          name="health-and-safety"
          size={24}
          color={COLORS.primaryMuted}
        />
      </View>

      <Text style={styles.footerText}>© 2024 The Clinical Sentinel</Text>
    </View>
  );

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />

      <View style={styles.backgroundGlowTop} pointerEvents="none" />
      <View style={styles.backgroundGlowBottom} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader />

        <View style={styles.card}>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>Bem-vindo ao Prev Heart</Text>
            <Text style={styles.subtitle}>
              Comece sua jornada com um acompanhamento clinico mais claro,
              moderno e acolhedor.
            </Text>
          </View>

          <View style={styles.actionsGroup}>
            <SocialButton
              label="Continuar com Apple"
              variant="apple"
              onPress={() => handleProviderPress("Apple")}
            />
            <SocialButton
              label="Continuar com Google"
              variant="google"
              onPress={() => handleProviderPress("Google")}
            />
          </View>

          <SectionDivider />

          <Pressable
            accessibilityRole="button"
            onPress={handleRegister}
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.registerButtonPressed,
            ]}
          >
            <Text style={styles.registerButtonText}>Criar conta clinica</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              resetErrors();
              setShowCredentials((current) => !current);
            }}
            style={({ pressed }) => [
              styles.signInLinkButton,
              pressed && styles.registerButtonPressed,
            ]}
          >
            <Text style={styles.signInLinkText}>
              {showCredentials
                ? "Ocultar login com e-mail"
                : "Ja possui cadastro? Entrar com e-mail e senha"}
            </Text>
          </Pressable>

          <CredentialFields />

          <Text style={styles.legalText}>
            AO CONTINUAR, VOCE CONCORDA COM NOSSO{"\n"}
            <Text style={styles.legalLink}>PROTOCOLO DE PRIVACIDADE</Text> E{" "}
            <Text style={styles.legalLink}>TERMOS DE SERVICO</Text>
          </Text>
        </View>

        <TrustIndicators />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
