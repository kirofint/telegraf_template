import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import { bot } from './helpers/bot'
import { errLogger } from './helpers/logger'
import { commandRun } from './commands/help'

// Commands
commandRun(bot)

bot.catch(errLogger)
bot.launch()