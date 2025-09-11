import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { tintColorLightBlue } from "@/constants/Colors";
import { Button } from "@/components/button";

export default function LinkDevice() {
  const router = useRouter();

  function callModal() {
    router.push("/(caregiver)/(withoutNavBar)/linkDeviceModal");
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerWarning}>
          <Ionicons name="alert-circle" size={90} color={tintColorLightBlue} />
          <Text style={styles.alert}>Nenhum dispositivo vinculado</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.text}>
            Vincule um dispositivo registrado a um idoso para monitorar o
            batimento cardíaco dele
          </Text>
        </View>
        <View style={{ height: 50 }}></View>
        <Button title="Vincular dispositivo" onPress={callModal} />
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
