import { Stack } from "expo-router";
import { FormDataProvider } from "@/contexts/FormDataContent";
import { tintColorLightBlue } from "@/constants/Colors";

export default function RegisterLayout() {
  return (
    <FormDataProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: tintColorLightBlue,
          },
          headerTintColor: "#fff",
        }}
      />
    </FormDataProvider>
  );
}
