import { z } from 'zod';

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

export const EventValidations = z
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
