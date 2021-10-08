import { Telegraf, Context } from 'telegraf'
import { isAdmin } from "@/middlewares/chatBehavior"

export default (bot: Telegraf<Context>): void => {
  bot.command('isonline', isAdmin, (ctx: Context) =>
		ctx.replyWithMarkdownAndStatus('*The bot is online*', '🟢')
  )
}
