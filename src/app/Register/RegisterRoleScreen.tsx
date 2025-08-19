import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import { AuthContainer } from "@/components/authContainer";
import { Title } from "@/components/title";
import { BackButton } from "@/components/button/BackButton";

import { IMAGES } from "@/constants/Images";

export default function RegisterRoleScreen() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.navigate("/")} />

      <AuthContainer>
        <Title>Você é?</Title>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.containerImage}
            activeOpacity={0.6}
            onPress={() =>
              router.navigate("/Register/RegisterCredentialsScreen")
            }
          >
            <Image source={IMAGES.elder} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerImage}
            activeOpacity={0.6}
            onPress={() =>
              router.navigate("/Register/RegisterCredentialsScreen")
            }
          >
            <Image source={IMAGES.caregiver} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.elderTextLeft}>Idoso</Text>
          <Text style={styles.caregiverTextRigth}>Cuidador</Text>
        </View>
      </AuthContainer>
    </View>
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
});
