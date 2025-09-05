import { useAuth } from "@/contexts/AuthContext";
import { Text } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/button";

export default function Index() {
  const { user, signOut } = useAuth();

  async function logout() {
    signOut();
    router.replace("/(auth)/Login");
  }

  return (
    <>
      <Text style={{ padding: 15 }}>Hello, {user?.name}!</Text>
      <Button onPress={logout} title="Logout" />
    </>
  );
}
