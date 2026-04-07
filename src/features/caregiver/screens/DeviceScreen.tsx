import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { getDevice } from "@/features/caregiver/api/getDevice";
import ErrorScreen from "@/shared/components/errorScreen";
import LoadingIcon from "@/shared/components/icons/loading";
import DeviceDetailsScreen from "./DeviceDetailsScreen";
import LinkDeviceScreen from "./LinkDeviceScreen";

export default function DeviceScreen() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["myDeviceCaregiver", user.id],
    queryFn: () => getDevice(user.token),
    enabled: !!user,
  });

  if (isError) return <ErrorScreen />;

  if (data === undefined || isLoading) return <LoadingIcon />;

  if (data.deviceId === null) return <LinkDeviceScreen />;

  return <DeviceDetailsScreen deviceId={data.deviceId} />;
}
