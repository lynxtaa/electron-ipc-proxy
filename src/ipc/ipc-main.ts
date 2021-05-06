import { ipcMain } from 'electron'

export function expose(api: Record<string, (...args: any[]) => unknown>): void {
	ipcMain.handle('api', (event, data) => {
		const { method, params } = data

		const fn = api[method]

		if (!fn) {
			throw new Error(`Method ${method} was not found`)
		}

		return fn(...params)
	})
}
