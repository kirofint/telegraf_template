import { Telegraf, session } from 'telegraf'
import logger from './logger'
import i18nSettings from './i18n'
import botSettings from '@/middlewares/botSettings'
import sessionSettings from '@/middlewares/sessionSettings'
import messagesCollector from '@/helpers/messagesCollector'
import commandIsOnline from '@/commands/isonline'
import commandGreeting from '@/commands/greeting'
import commandLanguage, { changeLanguageAction } from '@/commands/language'

const bot = new Telegraf(process.env.TOKEN)
bot.catch(logger)

bot.use(session(), sessionSettings)

bot.use(botSettings)

const languageList = i18nSettings(bot)
if (languageList?.length > 1) {
	changeLanguageAction(bot, languageList)
	commandLanguage(bot, languageList)
}

commandIsOnline(bot)
commandGreeting(bot)

messagesCollector(bot)

export default bot
