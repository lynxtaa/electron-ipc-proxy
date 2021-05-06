import { ipcRenderer } from 'electron'

type ApiProxy<T extends Record<string, (...args: any[]) => unknown>> = {
	[key in keyof T]: (...args: Parameters<T[key]>) => Promise<ReturnType<T[key]>>
}

export function getRemote<
	T extends Record<string, (...args: any[]) => unknown>
>(): ApiProxy<T> {
	return new Proxy(
		{},
		{
			get(target, name) {
				return function (...params: unknown[]) {
					return ipcRenderer.invoke('api', { method: name, params })
				}
			},
		},
	) as ApiProxy<T>
}
