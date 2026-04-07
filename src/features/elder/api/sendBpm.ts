import { API_URL } from "@/infra/env";

type bpmData = {
  bpm: number;
  token: string;
};

export const sendBpm = async ({ bpm, token }: bpmData): Promise<boolean> => {
  const request = await fetch(`${API_URL}/users/bpm`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bpm }),
  });

  if (!request.ok) throw new Error("Internal server error");

  return true;
};
