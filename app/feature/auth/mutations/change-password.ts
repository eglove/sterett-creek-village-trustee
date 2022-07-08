import {
  AuthenticationError,
  Ctx,
  NotFoundError,
  resolver,
  SecurePassword,
} from 'blitz';
import db from 'db';

import { ChangePasswordSchema } from '../validations';
import { authenticateUser } from './sign-in';

export default resolver.pipe(
  resolver.zod(ChangePasswordSchema),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx: Ctx) => {
    if (ctx.session.userId === null) {
      throw new AuthenticationError();
    }

    const user = await db.user.findUnique({
      select: { email: true, id: true },
      where: { id: ctx.session.userId },
    });

    if (user === null) {
      throw new NotFoundError();
    }

    await authenticateUser(user.email, currentPassword);

    const hashedPassword = await SecurePassword.hash(newPassword.trim());

    await db.user.update({
      data: { hashedPassword },
      select: { id: true },
      where: { id: user.id },
    });

    return true;
  }
);
