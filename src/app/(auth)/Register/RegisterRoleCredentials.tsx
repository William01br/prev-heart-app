import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
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

  const handleNext = (role: string) => {
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

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.containerImage}
              activeOpacity={0.6}
              onPress={() => handleNext("elder")}
            >
              <Image source={IMAGES.elder} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerImage}
              activeOpacity={0.6}
              onPress={() => handleNext("caregiver")}
            >
              <Image source={IMAGES.caregiver} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.elderTextLeft}>Idoso</Text>
            <Text style={styles.caregiverTextRigth}>Cuidador</Text>
          </View>

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
    flex: 0.9,
  },
  textButton: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
  containerImage: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
    margin: 16,
  },
  containerText: {
    flexDirection: "row",
    marginTop: -20,
    marginBottom: 60,
  },
  elderTextLeft: {
    marginLeft: 20,
    marginRight: 70,
    fontSize: 20,
    fontWeight: "bold",
  },
  caregiverTextRigth: {
    marginLeft: 40,
    fontSize: 20,
    fontWeight: "bold",
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
