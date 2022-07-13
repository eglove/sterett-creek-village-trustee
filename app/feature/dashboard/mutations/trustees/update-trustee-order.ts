import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

export const UpdateTrusteeOrderSchema = z.object({
  direction: z.enum(['up', 'down']),
  id: z.string(),
});

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateTrusteeOrderSchema),
  async ({ direction, id }) => {
    // Get trustee that user is requesting order change on
    const toChange = await db.trustee.findUnique({
      select: { order: true },
      where: { id },
    });

    if (toChange === null) {
      throw new Error('Trustee not found.');
    }

    // If toChange trustee is going up, get the next neighbor, else get the previous
    const toChangeOrder = toChange.order;
    let changeDirection = { order: toChangeOrder + 1 };
    if (direction === 'down') {
      changeDirection = { order: toChangeOrder - 1 };
    }

    // Temporarily set neighbor to -1
    const neighbor = await db.trustee.update({
      data: { order: -1 },
      select: { id: true },
      where: changeDirection,
    });

    // Increment or decrement toChange trustee
    const updated = await db.trustee.update({
      data: changeDirection,
      select: { id: true },
      where: { id },
    });

    // Set neighbor to plus or minus original order.
    await db.trustee.update({
      data: {
        order: toChangeOrder,
      },
      where: { id: neighbor.id },
    });

    return updated;
  }
);
