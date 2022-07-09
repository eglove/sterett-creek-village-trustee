import { z } from 'zod';

export const GetEventsSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export const CreateEventSchema = z
  .object({
    description: z.string(),
    endsAt: z.date(),
    startsAt: z.date(),
    title: z.string(),
  })
  .refine(
    data => {
      return data.endsAt > data.startsAt;
    },
    {
      message: 'End date must be after start date.',
      path: ['endsAt'],
    }
  );
