import { ipcRenderer } from 'electron'

import { MainApiType } from '../main/ipc'

type ApiProxy = {
	[key in keyof MainApiType]: (
		...args: Parameters<MainApiType[key]>
	) => Promise<ReturnType<MainApiType[key]>>
}

const proxy = new Proxy(
	{},
	{
		get(target, name) {
			return function (...params: unknown[]) {
				return ipcRenderer.invoke('api', { method: name, params })
			}
		},
	},
) as ApiProxy

const counterEl = document.createElement('div')
document.body.append(counterEl)

async function loadCounter() {
	try {
		const counter = await proxy.getCounter()
		counterEl.textContent = String(counter)
	} catch (err) {
		console.error(err)
	}
}

loadCounter()

const incrementBtn = document.createElement('button')
incrementBtn.textContent = 'Increment'
incrementBtn.setAttribute('type', 'button')
incrementBtn.addEventListener('click', () => proxy.increment().then(() => loadCounter()))
document.body.append(incrementBtn)
