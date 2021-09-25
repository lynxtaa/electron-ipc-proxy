import { expose } from '../src/main'
import { createIpcProxy } from '../src/renderer'

let counter = 0

const mainAPI = {
	getCounter: () => counter,
	increment: () => {
		counter++
	},
	setCounter(n: number) {
		counter = n
	},
}

type MainApiType = typeof mainAPI

export async function run(): Promise<void> {
	expose(mainAPI)

	const ipcProxy = createIpcProxy<MainApiType>()

	let counter = await ipcProxy.getCounter()

	await ipcProxy.increment()

	counter++

	await ipcProxy.setCounter(counter)
}
