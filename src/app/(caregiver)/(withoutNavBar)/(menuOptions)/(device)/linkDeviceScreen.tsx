import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "expo-router";
import { useState } from "react";

import { Button } from "@/components/button";
import { Title } from "@/components/title";
import { deviceIdSchema } from "@/utils/deviceIdSchema";
import { useAuth } from "@/contexts/AuthContext";
import { createLinkElder } from "@/utils/http/createlinkElder";
import LoadingIcon from "@/components/icons/loading";

export default function RegisterDeviceScreen() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");
  const queryClient = useQueryClient();
  const router = useRouter();

  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = (deviceId: string) => {
    setDeviceId(deviceId);
    try {
      deviceIdSchema.parse({ deviceId });
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.issues[0].message);
    }
  };

  const handleSubmit = async () => {
    try {
      deviceIdSchema.parse({ deviceId });

      setIsTransitioning(true);

      const request = await createLinkElder({ token: user.token, deviceId });

      if (request?.status === 404 || request?.status === 409) {
        setIsTransitioning(false);
        setError(request.message);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["myDeviceCaregiver", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["myElder", user.id],
      });

      router.navigate("/(caregiver)/(withoutNavBar)/(menuOptions)/(device)");
    } catch (err) {
      setIsTransitioning(false);
      if (err instanceof z.ZodError) setError(err.issues[0].message);
    }
  };

  if (isTransitioning) return <LoadingIcon />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={{ bottom: 60 }}>
          <Title>Não há dispositivo vinculado</Title>
        </View>
        <View style={{ height: 20 }}></View>
        <Text style={styles.text}>
          Por favor, digite o ID provido pelo dispositivo do idoso para
          vinculá-lo
        </Text>
        <View style={{ height: 20 }}></View>

        <TextInput
          style={styles.input}
          placeholder="Código do dispositivo"
          placeholderTextColor="#a49d9dff"
          value={deviceId}
          onChangeText={handleChange}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={{ height: 30 }}></View>
        <Button title="Vincular" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#f2f8fbff",
    borderRadius: 10,
    padding: 12,
    height: 52,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
    alignSelf: "flex-start",
  },
});
