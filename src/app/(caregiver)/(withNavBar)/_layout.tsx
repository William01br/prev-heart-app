import React from "react";

import NavBar from "@/components/navBar";
import { ProtectedRoute } from "@/components/HOC/ProtectedRoute";

export default function CaregiverLayout() {
  return (
    <ProtectedRoute allowedRoles={["caregiver"]}>
      <NavBar pathHome="index" pathMenu="menu" />
    </ProtectedRoute>
  );
}

// export default function CaregiverLayout() {
//   const { user, isInitializing } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();
//   const redirect = useRef(false);
//   console.log("CaregiverLayout render:", {
//     user,
//     isInitializing,
//     path: pathname,
//   });

//   useEffect(() => {
//     if (isInitializing) return;
//     if (!user) {
//       router.replace("/(auth)/Login");
//       return;
//     }
//     if (user.role !== "caregiver") {
//       if (user.role === "elder") router.replace("/(caregiver)/(withNavBar)");
//       else router.replace("/(auth)/Login");
//     }
//   }, [user, isInitializing, router]);

//   if (isInitializing) return null;
//   if (!user || user.role !== "caregiver") return null;

//   return <NavBar pathHome="index" pathMenu="menu" />;
// }
