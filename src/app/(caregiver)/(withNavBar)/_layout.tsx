import React from "react";

import NavBar from "@/shared/components/navBar";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export default function CaregiverLayout() {
  return (
    <ProtectedRoute allowedRoles={["caregiver"]}>
      <NavBar pathHome="index" pathMenu="menu" />
    </ProtectedRoute>
  );
}
