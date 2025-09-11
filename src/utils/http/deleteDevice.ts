export const deleteDevice = async (token: string) => {
  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/users/device`,
    {
      method: "DELETE",
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

  console.log(request.status);
};
