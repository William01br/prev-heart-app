type ProfileData = {
  id: number;
  cpf: string;
  email: string;
  name: string;
  phone: string;
};

export const getProfile = async (token: string): Promise<ProfileData> => {
  const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!request.ok)
    throw new Error(
      `Error HTTP: ${request.status}\nMessage: ${request.statusText}`
    );
  const response = await request.json();

  return {
    id: response.id,
    name: response.name,
    cpf: response.cpf,
    email: response.email,
    phone: response.phone,
  };
};
