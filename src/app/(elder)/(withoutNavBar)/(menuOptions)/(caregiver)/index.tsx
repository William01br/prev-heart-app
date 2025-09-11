import { useQuery } from "@tanstack/react-query";

import ErrorScreen from "@/components/errorScreen";
import LoadingIcon from "@/components/icons/loading";
import { useAuth } from "@/contexts/AuthContext";
import { getCaregiver } from "@/utils/http/getCaregiver";
import WithoutInformationScreen from "./withoutInformationScreen";
import CaregiverInformationScreen from "./caregiverInformationScreen";

export default function Index() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myCaregiver", user.id],
    queryFn: () => getCaregiver(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (data === undefined || isLoading) return <LoadingIcon />;

  if (data === null) return <WithoutInformationScreen />;

  return <CaregiverInformationScreen name={data.name} phone={data.phone} />;
}
