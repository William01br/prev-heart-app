import { Pressable, StyleSheet, Text, View } from "react-native";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { tintColorLightBlue } from "@/constants/Colors";

type DeviceIdData = {
  deviceId: string;
};

export default function DeviceScreen({ deviceId }: DeviceIdData) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.deviceContainer}>
          <Fontisto name="heartbeat" size={40} color="#fff" />
        </View>
        <View style={{ height: 30 }}></View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.textId}>ID do dispositivo vinculado:</Text>
          <View style={{ height: 20 }}></View>

          <Text style={styles.textId}>{deviceId}</Text>
        </View>

        <View style={{ height: 40 }}></View>

        <Text style={{ fontSize: 16 }}>Desvincular dispositivo?</Text>
        <View style={{ height: 10 }}></View>
        <Pressable
          onPress={() =>
            router.push(
              "/(caregiver)/(withoutNavBar)/(menuOptions)/(device)/unlinkDeviceModal"
            )
          }
        >
          <View style={{ height: 5 }}></View>
          <FontAwesome5 name="unlink" size={42} color={tintColorLightBlue} />
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
    height: 370,
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
