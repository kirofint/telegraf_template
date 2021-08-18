import { Context } from "telegraf"

export default ({ session }: Context, next: () => void) => {
  // toggles, boolean, statics
  session.states ??= {
    buttonClicksCounter: 0,
    buttonClicksCounterTimeout: null,
  }

  return next()
}
