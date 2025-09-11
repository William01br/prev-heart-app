type CaregiverData = {
  name: string;
  phone: string;
} | null;

export const getCaregiver = async (token: string): Promise<CaregiverData> => {
  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/users/caregiver`,
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

  if (response.name === null || response.phone === null) return null;

  console.log(response.name, response.phone);
  return { name: response.name, phone: response.phone };
};
