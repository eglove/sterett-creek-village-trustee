import { z } from 'zod';

export const UpdateHomeImageDescriptionSchema = z.object({
  description: z.string(),
  id: z.string().uuid(),
});

export const CreateHomeImageSchema = z.object({
  cloudinaryId: z.string(),
  description: z.string(),
  height: z.number(),
  url: z.string().url(),
  width: z.number(),
});
