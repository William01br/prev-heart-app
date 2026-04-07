import { API_URL } from "@/infra/env";

type Credentials = {
  cpf?: string;
  email?: string;
  password: string;
};

type RegisterPayload = {
  cpf?: string;
  email: string;
  name: string;
  password?: string;
  phone: string;
  role?: string;
};

export const loginRequest = async (credentials: Credentials) => {
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const registerRequest = async (payload: RegisterPayload) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const registerPushTokenRequest = async ({
  token,
  expoPushToken,
  platform,
  osVersion,
}: {
  token: string;
  expoPushToken: string | null;
  platform: string | null;
  osVersion: string | null;
}) => {
  return fetch(`${API_URL}/api/push-notification`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      expoPushToken,
      platform,
      osVersion,
    }),
  });
};

export const deletePushTokenRequest = async (token: string) => {
  return fetch(`${API_URL}/api/push-notification`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
