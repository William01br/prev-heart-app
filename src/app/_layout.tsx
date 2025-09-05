import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
// import PushNotificationManager from "@/components/pushNotificationManager";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
