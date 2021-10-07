import { Telegraf, Context } from 'telegraf'

export default (bot: Telegraf<Context>) => bot.command(['start', 'help'], ctx => ctx.reply( ctx.i18n.t('command_greeting') ))
