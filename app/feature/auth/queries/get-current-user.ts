import { User } from '@prisma/client';
import { Ctx, resolver } from 'blitz';
import db from 'db';

export type CurrentUser = Pick<User, 'email' | 'id' | 'name' | 'role'>;

export default resolver.pipe(
  async (_: undefined, { session }: Ctx): Promise<CurrentUser | null> => {
    if (session.userId === null) {
      return null;
    }

    return db.user.findUnique({
      select: { email: true, id: true, name: true, role: true },
      where: { id: session.userId },
    });
  }
);
