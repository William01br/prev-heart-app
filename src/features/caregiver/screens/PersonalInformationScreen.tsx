import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/features/caregiver/api/getProfile";
import PersonalInformationModel from "@/features/caregiver/components/personalInformationModel";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingIcon from "@/shared/components/icons/loading";
import ErrorScreen from "@/shared/components/errorScreen";

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
