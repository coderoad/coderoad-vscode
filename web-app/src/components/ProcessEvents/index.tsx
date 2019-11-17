import * as React from 'react'
import { Message as AlifdMessage } from '@alifd/next'
import * as T from 'typings'

interface Process {
	title: string
	description: string
}

interface Props {
	processes: T.ProcessEvent[]
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column' as 'column',
	},
}

// display a list of active processes
const ProcessEvents = (props: Props) => {
	return (
		<div style={styles.container}>
			{props.processes.map(process => (
				<AlifdMessage key={process.title} type="loading" size="medium" title={process.title}>
					{process.description}...
				</AlifdMessage>
			))}
		</div>
	)
}

export default ProcessEvents
