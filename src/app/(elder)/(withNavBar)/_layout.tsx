import React from "react";
import NavBar from "@/components/navBar";
import { ProtectedRoute } from "@/components/HOC/ProtectedRoute";

export default function ElderLayout() {
  return (
    <ProtectedRoute allowedRoles={["elder"]}>
      <NavBar pathHome="index" pathMenu="menu" />
    </ProtectedRoute>
  );
}

// export default function CaregiverLayout() {
//   const { user, isInitializing } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isInitializing) return;

//     if (!user) {
//       router.replace("/(auth)/Login");
//       return;
//     }
//     if (user.role !== "elder") {
//       if (user.role === "caregiver")
//         router.replace("/(caregiver)/(withNavBar)");
//       else router.replace("/(auth)/Login");
//     }
//   }, [user, isInitializing, router]);

//   // if (isInitializing) return <LoadingIcon />;
//   if (!user || user.role !== "elder") return null;

//   return <NavBar pathHome="index" pathMenu="menu" />;
// }
