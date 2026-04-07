import React from "react";
import NavBar from "@/shared/components/navBar";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export default function ElderLayout() {
  return (
    <ProtectedRoute allowedRoles={["elder"]}>
      <NavBar pathHome="index" pathMenu="menu" />
    </ProtectedRoute>
  );
}
