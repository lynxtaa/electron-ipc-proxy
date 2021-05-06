import { getRemote } from '../ipc/ipc-renderer'
import { MainApiType } from '../main/index'

const proxy = getRemote<MainApiType>()

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
