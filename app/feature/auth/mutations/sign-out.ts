import { Ctx } from 'blitz';

export default async function signOut(_: undefined, ctx: Ctx): Promise<void> {
  await ctx.session.$revoke();
}
