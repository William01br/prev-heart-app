import ArrowBackCleanIcon from "@/components/icons/arrowBackClean";
import { tintColorLightBlue } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Pressable, Text, View } from "react-native";

export default function MenuOptionsLayout() {
  const router = useRouter();

  const BackOrClose = () => (
    <Pressable
      onPress={() => router.replace("/(caregiver)/(withNavBar)/menu")}
      style={{ paddingHorizontal: 12 }}
      accessibilityLabel="Voltar"
    >
      <View style={styles.container}>
        <ArrowBackCleanIcon />
        <Text style={styles.text}>Voltar</Text>
      </View>
    </Pressable>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => <BackOrClose />,
        headerStyle: {
          backgroundColor: tintColorLightBlue,
        },
      }}
    >
      <Stack.Screen
        name="personalInformationScreen"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(device)/index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(device)/linkDeviceScreen"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(device)/unlinkDeviceModal"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(device)/deviceScreen"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elder)/index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elder)/withoutInformationScreen"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(elder)/elderInformationScreen"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
