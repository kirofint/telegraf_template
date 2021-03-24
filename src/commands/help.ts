import { Telegraf, Context } from 'telegraf'

export function commandRun (bot: Telegraf<Context>) {
  bot.command(['help', 'start'], ctx => {
    // Some action
  })
}
