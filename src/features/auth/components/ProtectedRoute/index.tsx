import React, { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingIcon from "@/shared/components/icons/loading";

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

  console.log({
    user: user?.role,
    name: user?.name,
    isInitializing,
    path: pathname,
  });

  useEffect(() => {
    if (isInitializing) return;

    if (user === null || !user) {
      router.replace("/(auth)/Login");
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      router.replace("/(auth)/Login");
      return;
    }
  }, [user, isInitializing, router]);

  if (isInitializing) return <LoadingIcon />;
  if (!user || !allowedRoles.includes(user.role)) return;

  return <>{children}</>;
}
