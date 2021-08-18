import { Context } from 'telegraf'
import logger from '@/helpers/logger'

export function isGroup (ctx: Context, next?: () => any) {
	if (
		['group', 'supergroup'].includes(ctx.chat?.type)
	) return next ? next() : true 
}

export function isReply(ctx: Context, next: () => any) {
  if (!ctx.message?.entities &&
		ctx.message?.reply_to_message?.from.id === ctx.botInfo.id
  ) return next()
}

export async function removeSelfMsg (ctx: Context, next?: () => any) {
  try {
    await ctx.deleteMessage()
  } catch (error) {
    return logger(error)
  } finally {
    return next && next()
  }
}

export async function skipCbQuery (ctx: Context, next: () => any) {
  await ctx.answerCbQuery()
  return next()
}
