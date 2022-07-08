import { Ctx, hash256, resolver, SecurePassword } from 'blitz';
import db from 'db';

import { ResetPasswordSchema } from '../validations';
import signIn from './sign-in';

export class ResetPasswordError extends Error {
  name = 'ResetPasswordError';
  message = 'Reset password link is invalid or it has expired.';
}

export default resolver.pipe(
  resolver.zod(ResetPasswordSchema),
  async ({ password, token }, ctx: Ctx) => {
    const hashedToken = hash256(token);
    const savedToken = await db.token.findFirst({
      select: {
        expiresAt: true,
        id: true,
        userId: true,
      },
      where: { hashedToken, type: 'RESET_PASSWORD' },
    });

    if (savedToken === null) {
      throw new ResetPasswordError();
    }

    await db.token.delete({ where: { id: savedToken.id } });

    if (savedToken.expiresAt < new Date()) {
      throw new ResetPasswordError();
    }

    const hashedPassword = await SecurePassword.hash(password.trim());
    const user = await db.user.update({
      data: { hashedPassword },
      select: { email: true, id: true },
      where: { id: savedToken.userId },
    });

    await db.session.deleteMany({ where: { userId: user.id } });

    await signIn({ email: user.email, password }, ctx);

    return true;
  }
);
