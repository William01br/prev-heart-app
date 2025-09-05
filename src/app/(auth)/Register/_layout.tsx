import { Slot, Stack } from "expo-router";
import { FormDataProvider } from "@/contexts/FormDataContent";

export default function RegisterLayout() {
  return (
    <FormDataProvider>
      <Stack screenOptions={{ headerShown: true }} />
    </FormDataProvider>
  );
}
