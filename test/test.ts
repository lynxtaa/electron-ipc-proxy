import { ipcRenderer, ipcMain } from 'electron'

import { expose } from '../src/main'
import { createIpcProxy } from '../src/renderer'

jest.mock('electron', () => ({
	ipcMain: {},
	ipcRenderer: {},
}))

const mainAPI = {
	sayHello: (name: string) => `Hello, ${name}`,
}

test('"expose" creates an IPC handler', async () => {
	let listener: any

	ipcMain.handle = jest.fn((channel, fn) => {
		listener = fn
	})

	ipcRenderer.invoke = jest.fn(async (channel, data) => {
		return await listener({}, data)
	})

	expose(mainAPI)

	const ipcProxy = createIpcProxy<typeof mainAPI>()

	const result = await ipcProxy.sayHello('Alice')

	expect(result).toEqual('Hello, Alice')
	expect(ipcMain.handle).toHaveBeenCalledWith('electron-ipc-proxy', expect.any(Function))
	expect(ipcRenderer.invoke).toHaveBeenCalledWith('electron-ipc-proxy', {
		method: 'sayHello',
		params: ['Alice'],
	})
})

test('ipcProxy throws when called with unknown method', async () => {
	let listener: any

	ipcMain.handle = jest.fn((channel, fn) => {
		listener = fn
	})

	ipcRenderer.invoke = jest.fn(async (channel, data) => {
		return await listener({}, data)
	})

	expose(mainAPI)

	const ipcProxy = createIpcProxy<typeof mainAPI>()

	// @ts-expect-error unknown method
	await expect(() => ipcProxy.unknown()).rejects.toThrowError(
		'Method "unknown" not found',
	)

	expect(ipcMain.handle).toHaveBeenCalledWith('electron-ipc-proxy', expect.any(Function))
	expect(ipcRenderer.invoke).toHaveBeenCalledWith('electron-ipc-proxy', {
		method: 'unknown',
		params: [],
	})
})
