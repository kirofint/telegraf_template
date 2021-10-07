import { DocumentType } from '@typegoose/typegoose'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { I18nContext } from '@kirofint/telegraf-i18n'
import { User } from '@/models/User'

interface SessionData {
  states: {
    buttonClicksCounter: number
    buttonClicksCounterTimeout: null | NodeJS.Timeout
  }
}
declare module 'telegraf' {
	export class Context {
		scene: any
		i18n: I18nContext
    session: SessionData
    dbuser: DocumentType<User>
    updateProperty: Function
    replyWithStatus (text: string, status: string, extra?: ExtraReplyMessage): void
    replyWithMarkdownAndStatus (markdown: string, status: string, concatenate?: boolean, extra?: ExtraReplyMessage): void
  }
}
