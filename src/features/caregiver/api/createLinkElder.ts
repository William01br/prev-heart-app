import { API_URL } from "@/infra/env";

type DeviceData = {
  token: string;
  deviceId: string;
};

type LinkElderResponse =
  | {
      deviceId: string;
    }
  | {
      status: 404 | 409;
      message: string;
    };

export const createLinkElder = async ({
  token,
  deviceId,
}: DeviceData): Promise<LinkElderResponse> => {
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
    if (request.status === 404 || request.status === 409) {
      const response = await request.json();

      return {
        status: request.status,
        message: response.message,
      };
    }

    throw new Error(
      `Error HTTP: ${request.status}\nMessage: ${request.statusText}`
    );
  }

  const response = await request.json();

  return { deviceId: response.deviceId };
};
