import { z } from 'zod';

export const GetEventSchema = z.object({
  id: z.string().optional(),
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

export const GetEventsPaginateSchema = z.object({
  skip: z.number(),
  take: z.number(),
});

export const UpsertEventSchema = z
  .object({
    description: z.string(),
    endsAt: z.date(),
    id: z.string().optional(),
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
