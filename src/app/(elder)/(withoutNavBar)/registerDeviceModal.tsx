import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { tintColorLightBlue } from "@/constants/Colors";
import { Button } from "@/components/button";
import { useAuth } from "@/contexts/AuthContext";
import { deviceIdSchema } from "@/utils/deviceIdSchema";
import { createDevice } from "@/utils/http/createDevice";
import LoadingIcon from "@/components/icons/loading";

export default function RegisterDeviceModal() {
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

      await createDevice({ token: user.token, deviceId });

      queryClient.invalidateQueries({ queryKey: ["myBpmElder", user.id] });

      router.navigate("/(elder)/(withNavBar)");
    } catch (err) {
      setIsTransitioning(false);
      if (err instanceof z.ZodError) setError(err.issues[0].message);
    }
  };

  if (isTransitioning) return <LoadingIcon />;

  return (
    <Modal transparent animationType="fade" statusBarTranslucent={true}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.close}
              onPress={() => router.back()}
            >
              <AntDesign name="close-circle" size={32} color="#000" />
            </TouchableOpacity>

            <MaterialCommunityIcons
              name="heart-pulse"
              size={82}
              color={tintColorLightBlue}
            />
            <Text style={styles.title}>Registrar Dispositivo</Text>
            <View style={{ height: 20 }}></View>
            <Text style={styles.text}>
              Por favor, digite o ID provido pelo seu dispositivo
            </Text>
            <View style={{ height: 20 }}></View>

            <TextInput
              style={styles.input}
              placeholder="Código do dispositivo"
              placeholderTextColor="#a49d9dff"
              value={deviceId}
              onChangeText={handleChange}
            />
            {error && (
              <Text style={styles.error}>
                O ID do dispositivo deve ser válido
              </Text>
            )}

            {!error && <View style={{ height: 30 }}></View>}
            <Button title="Registrar" onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#afbcc8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 20,
    padding: 40,
    backgroundColor: "#fff",
    height: Platform.OS === "ios" ? 410 : 430,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "100%",
    backgroundColor: "#f2f8fbff",
    borderRadius: 10,
    padding: 12,
    height: 52,
    fontSize: 16,
  },
  close: {
    alignSelf: "flex-end",
    left: 30,
    bottom: 11,
  },
  error: {
    color: "red",
    marginVertical: 10,
    alignSelf: "flex-start",
  },
});
