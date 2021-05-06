import { ipcMain } from 'electron'

let counter = 0

export const mainAPI = {
	getCounter: () => counter,
	increment: () => {
		counter++
	},
	setCounter(n: number) {
		counter = n
	},
}

export type MainApiType = typeof mainAPI

export function handleIPC(): void {
	ipcMain.handle('api', (event, data) => {
		const { method, params } = data

		const fn = (mainAPI as any)[method]

		if (!fn) {
			throw new Error(`Method ${method} was not found`)
		}

		return fn(...params)
	})
}
