import { z } from "zod";

export const deviceIdSchema = z.object({
  deviceId: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/,
      "O ID do dispositivo deve ser válido"
    ),
});
