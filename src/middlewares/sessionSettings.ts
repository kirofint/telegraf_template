import { Context } from "telegraf"

export default (ctx: Context, next: () => void) => {
  // toggles, boolean, statics
	ctx.session ||= {
		states: {
			buttonClicksCounter: 0,
			buttonClicksCounterTimeout: null,
		},
	}

  return next()
}
