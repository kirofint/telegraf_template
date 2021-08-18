import { DocumentType } from '@typegoose/typegoose'
import { User } from '@/models/User'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

interface SessionData {
  states: {
    buttonClicksCounter: number
    buttonClicksCounterTimeout: null | NodeJS.Timeout
  }
}
declare module 'telegraf' {
  export class Context {
    scene: any
    session: SessionData
    dbuser: DocumentType<User>
    updateProperty: Function
    replyWithStatus (text: string, status: string, extra?: ExtraReplyMessage): void
    replyWithMarkdownAndStatus (markdown: string, status: string, concatenate?: boolean, extra?: ExtraReplyMessage): void
  }
}