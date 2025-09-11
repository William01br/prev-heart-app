import { useQuery } from "@tanstack/react-query";

import PersonalInformationModel from "@/components/personalInformationModel";
import { useAuth } from "@/contexts/AuthContext";
import LoadingIcon from "@/components/icons/loading";
import ErrorScreen from "@/components/errorScreen";
import { getProfile } from "@/utils/http/getProfile";

export default function PersonalInformationScreen() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myProfileCaregiver", user.id],
    queryFn: () => getProfile(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (!data || isLoading) return <LoadingIcon />;

  return (
    <PersonalInformationModel
      name={data.name}
      cpf={data.cpf}
      email={data.email}
      phone={data.phone}
    />
  );
}
