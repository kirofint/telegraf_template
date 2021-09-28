import { Telegraf, session } from 'telegraf'
import logger from './logger'
import botSettings from '@/middlewares/botSettings'
import sessionSettings from '@/middlewares/sessionSettings'
import commandGreeting from '@/commands/greeting'
import messagesCollector from '@/helpers/messagesCollector'

const bot = new Telegraf(process.env.TOKEN)
bot.catch(logger)

bot.use(session(), sessionSettings)

commandGreeting(bot)

messagesCollector(bot)

bot.use(botSettings)


export default bot