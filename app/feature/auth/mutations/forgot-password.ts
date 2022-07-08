import { generateToken, hash256, resolver } from 'blitz';
import db from 'db';

import { forgotPasswordMailer } from '../../../../mailers/forgot-password-mailer';
import { ForgotPasswordSchema } from '../validations';

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 24;

export default resolver.pipe(
  resolver.zod(ForgotPasswordSchema),
  async ({ email }) => {
    const user = await db.user.findFirst({
      select: { email: true, id: true },
      where: { email: email.toLowerCase() },
    });

    const token = generateToken();
    const hashedToken = hash256(token);
    const expiresAt = new Date();
    expiresAt.setHours(
      expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS
    );

    if (user === null) {
      await new Promise(resolve => {
        setTimeout(resolve, 750);
      });
    } else {
      await db.token.deleteMany({
        where: { type: 'RESET_PASSWORD', userId: user.id },
      });

      await db.token.create({
        data: {
          expiresAt,
          hashedToken,
          sentTo: user.email,
          type: 'RESET_PASSWORD',
          user: { connect: { id: user.id } },
        },
        select: { id: true },
      });

      await forgotPasswordMailer({ to: user.email, token }).send();
    }
  }
);
