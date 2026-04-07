import { useQuery } from "@tanstack/react-query";

import ErrorScreen from "@/shared/components/errorScreen";
import LoadingIcon from "@/shared/components/icons/loading";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getCaregiver } from "@/features/elder/api/getCaregiver";
import CaregiverInformationScreen from "./CaregiverInformationScreen";
import CaregiverWithoutInformationScreen from "./CaregiverWithoutInformationScreen";

export default function CaregiverScreen() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myCaregiver", user.id],
    queryFn: () => getCaregiver(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (data === undefined || isLoading) return <LoadingIcon />;

  if (data === null) return <CaregiverWithoutInformationScreen />;

  return <CaregiverInformationScreen name={data.name} phone={data.phone} />;
}
