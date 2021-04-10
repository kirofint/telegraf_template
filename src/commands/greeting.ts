import { Telegraf, Context } from 'telegraf'

export default (bot: Telegraf<Context>) => {
  bot.command(['help', 'start'], (ctx: Context) => {
    
  })
}
