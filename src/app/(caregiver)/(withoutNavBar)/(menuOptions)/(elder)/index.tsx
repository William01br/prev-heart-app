import ErrorScreen from "@/components/errorScreen";
import LoadingIcon from "@/components/icons/loading";
import { useAuth } from "@/contexts/AuthContext";
import { getElderLinked } from "@/utils/http/getElderLinked";
import { useQuery } from "@tanstack/react-query";
import WithoutInformationScreen from "./withoutInformationScreen";
import ElderInformationScreen from "./elderInformationScreen";

export default function Index() {
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
    return <WithoutInformationScreen />;

  return <ElderInformationScreen name={data.name} phone={data.phone} />;
}
