import { I18n } from '@kirofint/telegraf-i18n'
import { Telegraf, Context } from 'telegraf'

const i18n = new I18n({
  directory: `${__dirname}/../../locales`,
  defaultLanguage: 'en',
  useSession: false,
  allowMissing: false,
})

export default (bot: Telegraf<Context>) => {
	bot.use(i18n.middleware(), (ctx, next) => {
    ctx.i18n.locale(ctx.dbuser.language)
    next()
	})

	return Object.keys(i18n.repository).map(languageCode => ({
		[languageCode]: i18n.t(languageCode, 'language_name')
	}))
}
