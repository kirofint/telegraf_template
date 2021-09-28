import { Context } from 'telegraf'
import logger from '@/helpers/logger'

export default (ctx: Context, next: () => any): void => {
  try {
    if (++ctx.session.states.buttonClicksCounter < 15) {
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
      
    ctx.answerCbQuery("You got a limitation because you made a lot of clicks", { show_alert: true })
	} catch (err) {
    logger(err)
  }
}