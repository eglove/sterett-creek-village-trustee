import { z } from 'zod';

export const IdSchema = z.object({
  id: z.string(),
});

export const FileSchema = z.object({
  bucket: z.string(),
  fileName: z.string(),
  fileType: z.enum(['COVENANTS', 'MEETING_MINUTES']),
  key: z.string(),
  url: z.string().url(),
});

export const OptionalIdSchema = z.object({
  id: z.string().uuid().optional(),
});

export const PaginateSchema = z.object({
  skip: z.number(),
  take: z.number(),
});

export const UpdateFileNameSchema = z.object({
  fileName: z.string(),
  id: z.string(),
});
