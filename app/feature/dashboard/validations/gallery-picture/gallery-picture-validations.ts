import { z } from 'zod';

export const UpdateGalleryPictureDescriptionSchema = z.object({
  description: z.string(),
  id: z.string().uuid(),
});

export const CreateGalleryPictureSchema = z.object({
  cloudinaryId: z.string(),
  description: z.string(),
  height: z.number(),
  url: z.string().url(),
  width: z.number(),
});
