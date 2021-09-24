import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import bot from './helpers/bot'
import commandGreeting from './commands/greeting'

// Commands
commandGreeting(bot)

bot.launch()