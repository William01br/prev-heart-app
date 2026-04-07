import ErrorScreen from "@/shared/components/errorScreen";
import LoadingIcon from "@/shared/components/icons/loading";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getElderLinked } from "@/features/caregiver/api/getElderLinked";
import { useQuery } from "@tanstack/react-query";
import ElderInformationScreen from "./ElderInformationScreen";
import ElderWithoutInformationScreen from "./ElderWithoutInformationScreen";

export default function ElderScreen() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myElder", user.id],
    queryFn: () => getElderLinked(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (data === undefined || isLoading) return <LoadingIcon />;

  console.log(data);
  if (data.name === null || data.phone === null)
    return <ElderWithoutInformationScreen />;

  return <ElderInformationScreen name={data.name} phone={data.phone} />;
}
