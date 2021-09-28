import { Context } from 'telegraf'

export function isAdmin (ctx: Context, next: () => any) {
	if (ctx.from.id === Number.parseInt(process.env.ADMIN_ID)) return next()
}

export function isGroup (ctx: Context, next: () => any) {
	if (['group', 'supergroup'].includes(ctx.chat?.type)) return next()
}

export function isAllowedChat (ctx: Context, next: () => any) {
  if (ctx.chat.id === Number.parseInt(process.env.CHAT_ID)) return next()
}

export function isMessageFromCandidate (ctx: Context, next: () => any) {
  if (ctx.from.id === Number.parseInt(process.env.CANDIDATE_USER_ID)) return next()
}

export function isNotFromCandidate (ctx: Context, next?: () => any) {
  if (ctx.from.id !== Number.parseInt(process.env.CANDIDATE_USER_ID)) return next ? next() : true
}

export async function skipCbQuery (ctx: Context, next: () => any) {
	await ctx.answerCbQuery()
  return next()
}
