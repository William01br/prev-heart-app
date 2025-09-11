import React, { useEffect, useRef } from "react";
import { useRouter, usePathname } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/navBar";
import LoadingIcon from "@/components/icons/loading";

export default function CaregiverLayout() {
  const { user, isInitializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  console.log("CaregiverLayout render:", {
    user,
    isInitializing,
    path: pathname,
  });

  useEffect(() => {
    if (isInitializing) return;
    if (!user) {
      router.replace("/(auth)/Login");
      return;
    }
    if (user.role !== "caregiver") {
      if (user.role === "elder") router.replace("/(caregiver)/(withNavBar)");
      else router.replace("/(auth)/Login");
    }
  }, [user, isInitializing, router]);

  if (isInitializing) return null;
  if (!user || user.role !== "caregiver") return null;

  return <NavBar pathHome="index" pathMenu="menu" />;
}
