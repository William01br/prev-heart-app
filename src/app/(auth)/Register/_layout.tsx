import { Stack } from "expo-router";
import { FormDataProvider } from "@/features/auth/hooks/useRegisterFormData";
import { tintColorLightBlue } from "@/shared/theme/colors";

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
