import { createWriteStream } from 'fs'

export function errLogger({ stack }: Error) {
	const stream = createWriteStream("err.log", {'flags': 'a'})
	stream.once('open', () =>
		stream.write(`[${ new Date().toLocaleString() }] ${stack}\r\n`)
	)
}