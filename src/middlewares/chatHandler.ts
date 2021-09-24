import { Context } from "telegraf"
import { findOrCreateUser } from '@/models/User'

export default async (ctx: Context, next: () => void) => {
  const data = await findOrCreateUser(ctx.from.id)
  ctx.dbuser = data

  return next()
}