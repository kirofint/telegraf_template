import { Telegraf, Context } from 'telegraf'

export default (bot: Telegraf<Context>) => bot.command(['start', 'help'], ctx => console.log('Commands are working'))
