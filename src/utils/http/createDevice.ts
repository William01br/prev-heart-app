type DeviceData = {
  token: string;
  deviceId: string;
};

export const createDevice = async ({ token, deviceId }: DeviceData) => {
  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/users/device`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),
    }
  );

  if (!request.ok)
    throw new Error(
      `Error HTTP: ${request.status}\nMessage: ${request.statusText}`
    );

  const response = await request.json();
  console.log(request.status);
  console.log(response);

  return { deviceId: response.deviceId };
};
