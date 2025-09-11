import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";
import { getDevice } from "@/utils/http/getDevice";
import ErrorScreen from "@/components/errorScreen";
import LoadingIcon from "@/components/icons/loading";
import RegisterDeviceScreen from "./linkDeviceScreen";
import DeviceScreen from "./deviceScreen";

export default function Index() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myDeviceCaregiver", user.id],
    queryFn: () => getDevice(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (data === undefined || isLoading) return <LoadingIcon />;

  if (data.deviceId === null) return <RegisterDeviceScreen />;

  return <DeviceScreen deviceId={data.deviceId} />;
}
