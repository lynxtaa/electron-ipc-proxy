import { ipcMain } from 'electron'

export function expose(
	api: Record<string, (...args: any[]) => unknown>,
	{ channel = 'electron-ipc-proxy' }: { channel?: string } = {},
): void {
	ipcMain.handle(channel, (event, data) => {
		const { method, params } = data as { method: string; params: any[] }

		const fn = api[method]

		if (!fn) {
			throw new Error(`Method "${method}" not found`)
		}

		return fn(...params)
	})
}
