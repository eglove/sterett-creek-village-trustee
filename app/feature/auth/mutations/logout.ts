import { Ctx } from 'blitz';

export default async function logout(_: undefined, ctx: Ctx): Promise<void> {
  await ctx.session.$revoke();
}
