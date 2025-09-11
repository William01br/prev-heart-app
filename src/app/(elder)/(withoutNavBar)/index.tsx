import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { tintColorLightBlue } from "@/constants/Colors";
import { Button } from "@/components/button";

export default function RegisterDevice() {
  const router = useRouter();

  function callModal() {
    router.push("/(elder)/(withoutNavBar)/registerDeviceModal");
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerWarning}>
          <Ionicons name="alert-circle" size={90} color={tintColorLightBlue} />
          <Text style={styles.alert}>Nenhum dispositivo registrado</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.text}>
            Por favor, registre um dispositivo para ver seu batimento cardíaco
          </Text>
        </View>
        <View style={{ height: 50 }}></View>
        <Button title="Registrar dispositivo" onPress={callModal} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerWarning: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    height: 200,
    backgroundColor: "#b3d1f3ff",
  },
  alert: {
    fontSize: 24,
    maxWidth: "70%",
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
});
