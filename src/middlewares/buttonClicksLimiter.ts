import { Context } from 'telegraf'
import logger from '@/helpers/logger'

export default (ctx: Context, next: () => any): void => {
	try {
		if (
			ctx.session.states?.buttonClicksCounter
			&& ++ctx.session.states.buttonClicksCounter < 15
		) {
        ctx.session.states.buttonClicksCounterTimeout ||=
          setTimeout(() => {
            if (ctx.session.states) {
              ctx.session.states.buttonClicksCounter = 0
              ctx.session.states.buttonClicksCounterTimeout = null
              clearTimeout(ctx.session.states.buttonClicksCounterTimeout)
            }
          }, 25000)
      return next()
    }

    ctx.answerCbQuery(ctx.i18n.t('button_clicks_limitted_msg'), { show_alert: true })
	} catch (err) {
    logger(err)
  }
}
