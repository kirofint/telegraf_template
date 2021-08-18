import { Telegraf, session } from 'telegraf'
import logger from './logger'
import botSettings from '@/middlewares/botSettings'
import sessionSettings from '@/middlewares/sessionSettings'

const bot = new Telegraf(process.env.TOKEN)

bot.use(botSettings)
bot.use(session(), sessionSettings)

bot.catch(logger)

export default bot