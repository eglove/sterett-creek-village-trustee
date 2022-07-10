import { z } from 'zod';

export const IdSchema = z.object({
  id: z.string(),
});

export const OptionalIdSchema = z.object({
  id: z.string().uuid().optional(),
});

export const PaginateSchema = z.object({
  skip: z.number(),
  take: z.number(),
});
