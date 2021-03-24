import { Telegraf, Context } from 'Telegraf'

export function commandRun (bot: Telegraf<Context>) {
  bot.command(['help', 'start'], ctx => {
    // Some action
  })
}