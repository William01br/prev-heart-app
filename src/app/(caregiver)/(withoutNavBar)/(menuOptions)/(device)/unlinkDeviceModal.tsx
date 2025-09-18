import {
  StyleSheet,
  Modal,
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { tintColorLightBlue, tintColorLightGray } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { deleteLinkElder } from "@/utils/http/deleteLinkElder";
import LoadingIcon from "@/components/icons/loading";

export default function ExcludeDeviceModal() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsTransitioning(true);

      await deleteLinkElder(user.token);

      queryClient.invalidateQueries({
        queryKey: ["myDeviceCaregiver", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["myElder", user.id],
      });

      router.navigate("/(caregiver)/(withoutNavBar)/(menuOptions)/(device)");
    } catch (err) {
      setIsTransitioning(false);
      throw new Error("Internal Server Error");
    }
  };

  if (isTransitioning) return <LoadingIcon />;

  return (
    <Modal transparent animationType="fade" statusBarTranslucent={true}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.circle}>
            <FontAwesome5 name="unlink" size={28} color="#fff" />
          </View>
          <View style={{ height: 30 }}></View>
          <Text style={styles.title}>Desvincular dispositivo?</Text>
          <View style={{ height: 10 }}></View>
          <Text style={styles.subtitle}>Esta ação não pode ser desfeita</Text>
          <View style={{ height: 30 }}></View>
          <View style={styles.buttonContainer}>
            <View
              style={[styles.button, { backgroundColor: tintColorLightGray }]}
            >
              {Platform.OS === "ios" ? (
                <Button
                  title="Cancelar"
                  color="#000"
                  onPress={() => router.back()}
                />
              ) : (
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.textButtonAndroid}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={[styles.button, { backgroundColor: tintColorLightBlue }]}
            >
              {Platform.OS === "ios" ? (
                <Button
                  title="Desvincular"
                  color="#fff"
                  onPress={handleSubmit}
                />
              ) : (
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={[styles.textButtonAndroid, { color: "#fff" }]}>
                    Desvincular
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
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
    padding: 20,
    backgroundColor: "#fff",
    height: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderWidth: 6,
    borderColor: "#ef4444",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
  buttonContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "47%",
    height: 54,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonAndroid: {
    fontWeight: "500",
    fontSize: 16,
  },
});
