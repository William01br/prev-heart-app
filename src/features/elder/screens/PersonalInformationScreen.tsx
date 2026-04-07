import { useQuery } from "@tanstack/react-query";

import PersonalInformationModel from "@/features/elder/components/personalInformationModel";
import { getProfile } from "@/features/elder/api/getProfile";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ErrorScreen from "@/shared/components/errorScreen";
import LoadingIcon from "@/shared/components/icons/loading";

export default function PersonalInformationScreen() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myProfileElder", user.id],
    queryFn: () => getProfile(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (!data || isLoading) return <LoadingIcon />;

  // const payload = {
  //   name: "william dos santos",
  //   cpf: "123455688",
  //   email: "williamExample123@example.com",
  //   phone: "21912345678",
  // };

  // const { name, cpf, email, phone } = payload;

  return (
    <PersonalInformationModel
      name={data.name}
      cpf={data.cpf}
      email={data.email}
      phone={data.phone}
    />
  );
}
