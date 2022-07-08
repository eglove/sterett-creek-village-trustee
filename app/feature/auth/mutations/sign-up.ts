import { Ctx, resolver, SecurePassword } from 'blitz';
import db from 'db';

import { Role } from '../../../../types';
import { SignUpSchema } from '../validations';

export default resolver.pipe(
  resolver.zod(SignUpSchema),
  async ({ email, password }, ctx: Ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim());

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        role: 'USER',
      },
    });

    await ctx.session.$create({ role: user.role as Role, userId: user.id });
  }
);
