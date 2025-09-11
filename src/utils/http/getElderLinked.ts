type ElderData = {
  name: string | null;
  phone: string | null;
  deviceId: string | null;
  bpm: number | null;
};

export const getElderLinked = async (token: string): Promise<ElderData> => {
  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/users/elder`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const response = await request.json();

  if (!request.ok) {
    if (request.status === 404) {
      return {
        name: null,
        phone: null,
        deviceId: null,
        bpm: null,
      };
    }
    throw new Error("Internal Server Error");
  }

  return {
    name: response.name,
    phone: response.phone,
    deviceId: response.deviceId,
    bpm: response.bpm,
  };
};
