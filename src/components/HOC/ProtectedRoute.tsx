import React, { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import LoadingIcon from "../icons/loading";

type ProtectedRouteProps = {
  allowedRoles: ("elder" | "caregiver" | "admin")[];
  children: React.ReactNode;
};

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
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
    if (!allowedRoles.includes(user.role)) {
      router.replace("/(auth)/Login");
    }
  }, [user, isInitializing, router]);

  if (isInitializing) return <LoadingIcon />;
  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
