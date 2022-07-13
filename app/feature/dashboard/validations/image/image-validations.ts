import { z } from 'zod';

export const imageValidations = z.object({
  cloudinaryId: z.string(),
  description: z.string(),
  height: z.number(),
  url: z.string().url(),
  width: z.number(),
});
