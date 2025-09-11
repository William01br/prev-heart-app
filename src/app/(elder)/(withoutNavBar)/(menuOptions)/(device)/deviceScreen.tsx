import { Pressable, StyleSheet, Text, View } from "react-native";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { tintColorLightBlue } from "@/constants/Colors";

type DeviceData = {
  deviceId: string;
};

export default function DeviceScreen({ deviceId }: DeviceData) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.deviceContainer}>
          <Fontisto name="heartbeat" size={40} color="#fff" />
        </View>
        <View style={{ height: 30 }}></View>
        <Text style={styles.textId}>ID: {deviceId}</Text>
        <View style={{ height: 50 }}></View>

        <Text style={{ fontSize: 16 }}>Remover dispositivo?</Text>
        <View style={{ height: 10 }}></View>
        <Pressable
          onPress={() =>
            router.push(
              "/(elder)/(withoutNavBar)/(menuOptions)/(device)/excludeDeviceModal"
            )
          }
        >
          <FontAwesome5 name="trash" size={42} color={tintColorLightBlue} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#d6edffff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    borderRadius: 20,
    padding: 40,
    backgroundColor: "#fff",
    height: 350,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceContainer: {
    height: 70,
    width: 70,
    borderRadius: 10,
    backgroundColor: tintColorLightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  textId: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
});
