import { z } from 'zod';

export const UpdateHomeSchema = z.object({
  cloudinaryId: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  height: z.number().min(1).optional(),
  missionStatement: z.string().min(3).optional(),
  url: z.string().url().optional(),
  width: z.number().min(1).optional(),
});
