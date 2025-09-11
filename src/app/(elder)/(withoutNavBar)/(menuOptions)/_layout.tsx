import ArrowBackCleanIcon from "@/components/icons/arrowBackClean";
import { tintColorLightBlue } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Pressable, Text, View } from "react-native";

export default function MenuOptionsLayout() {
  const router = useRouter();

  const BackOrClose = () => (
    <Pressable
      onPress={() => router.replace("/(elder)/(withNavBar)/menu")}
      style={{ paddingHorizontal: 12 }}
      accessibilityLabel="Voltar"
    >
      <View style={styles.container}>
        <ArrowBackCleanIcon />
        <Text style={styles.text}>Voltar</Text>
      </View>
    </Pressable>
  );
  // COLOCAR UM ÍCONE AO LADO DE TEXT E COLOCA AMBOS DENTRO DE UMA DIV

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
        name="(device)/excludeDeviceModal"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(caregiver)/index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(caregiver)/withoutInformationScreen"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="(caregiver)/caregiverInformationScreen"
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
