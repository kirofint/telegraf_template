import { createWriteStream } from 'fs'
import bot from './bot'
const ADMIN_ID = process.env.ADMIN_ID
let errorsToReport = <Array<string>>[]


async function sendLogToMessage (): Promise<void> {
  if (errorsToReport.length >= 1) {
    const chunks = []
    for (let numb = -1; errorsToReport.length > 0;) {
      const errPart = errorsToReport.shift()
      if (chunks[numb] && (chunks[numb].length + errPart.length <= 4000)) {
        chunks[numb] += "=".repeat(24) + '\r\n' + errPart
      } else
        chunks[++numb] = errPart
    }

    for (let chunk of chunks) {
      try {
        await bot.telegram.sendMessage(ADMIN_ID, chunk)
      } catch ({ stack }) {
        saveLogAsFile(stack)
      }
    }
  }
}

function saveLogAsFile (log: string): void {
  const stream = createWriteStream("err.log", { 'flags': 'a' })
  stream.once('open', () => stream.write(log))
}

export default ({ stack }: Error): void => {
  if (!stack) return;
  const errLog = `[${ new Date().toLocaleString() }] ${ stack }\r\n`;

  if (!ADMIN_ID) return saveLogAsFile(errLog)
  errorsToReport.push(errLog)
}

ADMIN_ID && setInterval(sendLogToMessage, 60 * 10000)
