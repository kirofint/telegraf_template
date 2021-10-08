import { Context } from "telegraf"
import { findOrCreateUser, updateUser } from '@/models/User'

enum AllowedModels {
  User = 'user',
}

enum ReplyStatusList {
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

const getMessageStatus = (status: string) => {
  switch (status) {
    case ReplyStatusList.Error:
      return '❌'
    case ReplyStatusList.Success:
      return '✅'
    case ReplyStatusList.Warning:
      return '⚠️'
    case ReplyStatusList.Info:
      return 'ℹ️'
    default:
      if (status?.length > 1)
        return `${status}`
  }
}

export default async (ctx: Context, next: () => void) => {
  const userdata = await findOrCreateUser(ctx.from.id, ctx.from?.username, ctx.from.language_code)
	ctx.dbuser = userdata

  ctx.replyWithMarkdownAndStatus = async (markdown, status, concatenate = false, extra = {}) => {
    const statusMessage = getMessageStatus(status)
    const message = concatenate ? `\`${markdown}\`` : markdown
    return await ctx.replyWithMarkdown(`*${statusMessage}*` + ' ' + message, { ...extra, parse_mode: 'MarkdownV2' })
  }

  ctx.replyWithStatus = async (message, status, extra = {}) => {
    const statusMessage = getMessageStatus(status)
    return await ctx.reply(statusMessage + ' ' + message, extra)
  }

  ctx.updateProperty = async (prop: string | Array<string>, table: string) => {
    typeof prop === 'string' && (prop = [prop])
    switch (table) {
      case AllowedModels.User:
      default:
        return updateUser(userdata, prop)
    }
  }

  return next()
}
