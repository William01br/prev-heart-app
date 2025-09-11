import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Pressable,
} from "react-native";
import { useState } from "react";
import { router, Stack } from "expo-router";

import { useFormData } from "@/contexts/FormDataContent";
import { AuthContainer } from "@/components/authContainer";
import { Title } from "@/components/title";
import { IMAGES } from "@/constants/Images";
import { tintColorLightBlue } from "@/constants/Colors";

export default function RegisterRoleScreen() {
  const { updateFormData } = useFormData();
  const [_role, setRole] = useState("");

  const handleNext = (role: "elder" | "caregiver") => {
    setRole(role);
    updateFormData({ role });
    router.push("/Register/RegisterCredentialsScreen");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Etapa 1" }} />
      <View style={styles.container}>
        <AuthContainer>
          <Title>Você é?</Title>
          <View style={{ height: 30 }}></View>

          <View style={styles.content}>
            <View style={styles.containerImage}>
              <Image source={IMAGES.caregiver} style={styles.image} />
              <View style={{ height: 20 }}></View>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.containerButton}
                onPress={() => handleNext("caregiver")}
              >
                <Text style={styles.textButton}>Cuidador</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerImage}>
              <Image source={IMAGES.elder} style={styles.image} />
              <View style={{ height: 20 }}></View>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.containerButton}
                onPress={() => handleNext("elder")}
              >
                <Text style={styles.textButton}>Idoso</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 20 }}></View>
          <View style={styles.containerTextButton}>
            <Text style={styles.text}>Volte para a tela de </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.navigate("/")}
            >
              <Text style={styles.textButtonLogin}>Login</Text>
            </TouchableOpacity>
          </View>
        </AuthContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    height: 250,
  },
  containerButton: {
    width: "100%",
    borderRadius: 16,
    height: 30,
    backgroundColor: "#cad7e7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  containerImage: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.125,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
    backgroundColor: "#ffffffff",
    flexDirection: "column",
    width: "47%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
  },
  containerTextButton: {
    flexDirection: "row",
  },
  text: {
    color: "#000",
    fontSize: 14,
    paddingRight: 2,
  },
  textButtonLogin: {
    color: tintColorLightBlue,
    fontSize: 15,
    fontWeight: "bold",
  },
});
