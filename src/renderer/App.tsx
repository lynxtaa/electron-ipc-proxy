import { useCallback, useEffect, useState } from 'react'

import { ipcProxy } from './ipcProxy'

export default function App() {
	const [counter, setCounter] = useState<number>()
	const [text, setText] = useState<string>('')

	const loadCounter = useCallback(
		() => ipcProxy.getCounter().then(counter => setCounter(counter)),
		[],
	)

	useEffect(() => {
		loadCounter()
	}, [loadCounter])

	return (
		<div>
			<p>
				<span style={{ display: 'inline-block', marginRight: '1rem' }}>{counter}</span>
				<button
					type="button"
					onClick={() => ipcProxy.increment().then(() => loadCounter())}
				>
					+
				</button>
			</p>
			<form
				onSubmit={event => {
					event.preventDefault()
					ipcProxy.setCounter(Number(text)).then(() => loadCounter())
				}}
			>
				<label htmlFor="counter" style={{ marginRight: '1rem' }}>
					Counter
				</label>
				<input
					name="counter"
					id="counter"
					value={text}
					type="number"
					onChange={event => setText(event.target.value)}
				/>
				<button type="submit" disabled={!text}>
					Set counter
				</button>
			</form>
		</div>
	)
}
