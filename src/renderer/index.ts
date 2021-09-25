import { ipcRenderer } from 'electron'

export type ApiProxy<T extends Record<string, (...args: any[]) => unknown>> = {
	[key in keyof T]: (
		...args: Parameters<T[key]>
	) => ReturnType<T[key]> extends Promise<any>
		? ReturnType<T[key]>
		: Promise<ReturnType<T[key]>>
}

export function createIpcProxy<T extends Record<string, (...args: any[]) => unknown>>({
	channel = 'electron-ipc-proxy',
}: { channel?: string } = {}): ApiProxy<T> {
	return new Proxy(
		{},
		{
			get(target, name) {
				return function (...params: unknown[]) {
					return ipcRenderer.invoke(channel, { method: name, params })
				}
			},
		},
	) as ApiProxy<T>
}
