import { useQuery } from "@tanstack/react-query";

import ErrorScreen from "@/shared/components/errorScreen";
import LoadingIcon from "@/shared/components/icons/loading";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getDevice } from "@/features/elder/api/getDevice";
import DeviceDetailsScreen from "./DeviceDetailsScreen";
import RegisterDeviceScreen from "./RegisterDeviceScreen";

export default function DeviceScreen() {
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

  return <DeviceDetailsScreen deviceId={data.deviceId} />;
}
