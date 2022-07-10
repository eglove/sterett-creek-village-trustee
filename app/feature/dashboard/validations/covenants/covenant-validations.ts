import { z } from 'zod';

export const UpdateCovenantTitleSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
});

export const UploadCovenant = z.object({
  cloudinaryId: z.string(),
  height: z.number(),
  title: z.string(),
  url: z.string().url(),
  width: z.number(),
});
