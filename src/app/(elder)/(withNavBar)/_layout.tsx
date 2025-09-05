import React, { useEffect } from "react";
import { useRouter } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/navBar";

export default function CaregiverLayout() {
  const { user, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitializing) return;

    if (user === null) {
      router.replace("/(auth)/Login");
      return;
    }
    if (user.role !== "elder") {
      if (user.role === "caregiver") router.replace("/(caregiver)");
      else router.replace("/(auth)/Login");
    }
  }, [user, isInitializing, router]);

  return <NavBar pathHome="index" pathMenu="menu" />;
}
