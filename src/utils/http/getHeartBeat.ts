import { API_URL } from "@/constants/url";

type HeartBeatData = {
  bpm: number | null;
  deviceId: string | null;
};

export const getHeartBeat = async (token: string): Promise<HeartBeatData> => {
  const request = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!request.ok) throw new Error("Internal Server Error");

  const response = await request.json();

  // since the heart beat is simulated, is send the heart beat manually in the first time.
  if (response.elderProfile.deviceId && response.elderProfile.bpm === null) {
    const sendBpm = await fetch(`${API_URL}/users/bpm`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bpm: 75 }),
    });

    if (!sendBpm.ok) throw new Error("Internal Server Error while send BPM");
  }

  // console.log(
  //   "BACKEND:",
  //   response.elderProfile.bpm,
  //   response.elderProfile.deviceId
  // );

  return {
    bpm: response.elderProfile.bpm,
    deviceId: response.elderProfile.deviceId,
  };
};
