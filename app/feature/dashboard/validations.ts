import { z } from 'zod';

export const IdSchema = z.object({
  id: z.string(),
});

export const OptionalIdSchema = z.object({
  id: z.string().uuid().optional(),
});

export const GetEventsSchema = z
  .object({
    from: z.date(),
    to: z.date(),
  })
  .refine(
    data => {
      return data.from < data.to;
    },
    {
      message: 'End time must be after start time.',
      path: ['from'],
    }
  );

export const PaginateSchema = z.object({
  skip: z.number(),
  take: z.number(),
});

export const UpdateCovenantTitle = z.object({
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

export const UpsertEventSchema = z
  .object({
    description: z.string(),
    endsAt: z.date(),
    id: z.string().uuid().optional(),
    startsAt: z.date(),
    title: z.string(),
  })
  .refine(
    data => {
      return data.endsAt > data.startsAt;
    },
    {
      message: 'End time must be after start time.',
      path: ['endsAt'],
    }
  );
