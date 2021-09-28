import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import bot from './helpers/bot'

bot.launch().then(() => {
  console.info(`Bot ${bot.botInfo.username} is up and running`)
})