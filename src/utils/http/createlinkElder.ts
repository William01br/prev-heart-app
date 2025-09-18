import { API_URL } from "@/constants/url";

type DeviceData = {
  token: string;
  deviceId: string;
};

export const createLinkElder = async ({ token, deviceId }: DeviceData) => {
  const request = await fetch(`${API_URL}/users/link`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deviceId }),
  });

  if (!request.ok) {
    if (request.status === 404) {
      return {
        status: 404,
        error: "Not Found",
        message: "O dispositivo digitado não foi registrado ainda!",
      };
    }
    if (request.status === 409)
      return {
        status: 409,
        error: "Conflict",
        message: "O dispositivo já está vinculado à outro cuidador!",
      };
    throw new Error("Internal Server Error");
  }
};
