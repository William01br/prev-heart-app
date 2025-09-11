import { useQuery } from "@tanstack/react-query";

import ErrorScreen from "@/components/errorScreen";
import LoadingIcon from "@/components/icons/loading";
import { useAuth } from "@/contexts/AuthContext";
import { getDevice } from "@/utils/http/getDevice";
import RegisterDeviceScreen from "./registerDeviceScreen";
import DeviceScreen from "./deviceScreen";

export default function Index() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myDeviceElder", user.id],
    queryFn: () => getDevice(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (data === undefined || isLoading) return <LoadingIcon />;

  if (data.deviceId === null) return <RegisterDeviceScreen />;

  return <DeviceScreen deviceId={data.deviceId} />;
}
