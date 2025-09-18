import { API_URL } from "@/constants/url";

export const deleteLinkElder = async (token: string) => {
  const request = await fetch(`${API_URL}/users/unlink`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!request.ok) throw new Error("Internal Server Error");
};
