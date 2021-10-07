import { Telegraf, Context, Markup } from 'telegraf'
import { removeSelfMsg } from '@/middlewares/chatBehavior'

export function changeLanguageAction (bot: Telegraf<Context>, languages: object[]): void {
  const langCodeList = languages.map(langObj => Object.keys(langObj)).flat(1)
	bot.action(langCodeList, async (ctx, next: () => any) => {
		const selectedLang = ctx.callbackQuery?.['data']
      ctx.i18n.locale(selectedLang)

			ctx.dbuser.language = selectedLang
			ctx.updateProperty('language')

			await ctx.answerCbQuery(
        ctx.i18n.t('language_selected')
			)
		return next()
	}, removeSelfMsg)
}

export default (bot: Telegraf<Context>, languages: object[]) => bot.command(['language'], ctx => {
	const selectLanguageMarkup = Markup.inlineKeyboard(
		languages.map(lang => {
      const associatedLanguage = Object.entries(lang).flat()
      return Markup.button.callback(associatedLanguage[1], associatedLanguage[0])
    })
	)

	ctx.replyWithStatus(ctx.i18n.t('command_language'), 'info', selectLanguageMarkup)
})
