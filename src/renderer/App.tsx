import { useState } from 'react'
import useSWR from 'swr'

import { ipcProxy } from './ipcProxy'

export default function App() {
	const [text, setText] = useState<string>('')

	const { data: counter, mutate } = useSWR('counter', () => ipcProxy.getCounter())

	return (
		<div>
			<p>
				<span style={{ display: 'inline-block', marginRight: '1rem' }}>{counter}</span>
				<button type="button" onClick={() => ipcProxy.increment().finally(mutate)}>
					+
				</button>
			</p>
			<form
				onSubmit={event => {
					event.preventDefault()
					ipcProxy.setCounter(Number(text)).finally(mutate)
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
