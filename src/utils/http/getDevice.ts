type DeviceData = {
  deviceId: string | null;
};

export const getDevice = async (token: string): Promise<DeviceData> => {
  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/users/device`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!request.ok)
    throw new Error(
      `Error HTTP: ${request.status}\nMessage: ${request.statusText}`
    );

  const response = await request.json();

  return { deviceId: response.deviceId };
};
