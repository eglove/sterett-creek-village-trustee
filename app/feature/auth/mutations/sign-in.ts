import { User } from '@prisma/client';
import { AuthenticationError, Ctx, resolver, SecurePassword } from 'blitz';
import db from 'db';

import { Role } from '../../../../types';
import { SignInSchema } from '../validations';

export const authenticateUser = async (
  rawEmail: string,
  rawPassword: string
): Promise<Pick<User, 'id' | 'role'>> => {
  const { email, password } = SignInSchema.parse({
    email: rawEmail,
    password: rawPassword,
  });

  const user = await db.user.findFirst({ where: { email } });

  if (user === null) {
    throw new AuthenticationError('Credentials not found.');
  }

  const result = await SecurePassword.verify(user.hashedPassword, password);

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password);
    await db.user.update({
      data: { hashedPassword: improvedHash },
      select: {
        id: true,
        role: true,
      },
      where: { id: user.id },
    });
  }

  return user;
};

export default resolver.pipe(
  resolver.zod(SignInSchema),
  async ({ email, password }, ctx: Ctx) => {
    const user = await authenticateUser(email, password);

    await ctx.session.$create({ role: user.role as Role, userId: user.id });

    return user;
  }
);
