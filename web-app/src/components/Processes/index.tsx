import * as React from 'react'
import { Message as AlifdMessage } from '@alifd/next'

interface Process {
	title: string
	description: string
}

interface Props {
	processes: Process[]
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column' as 'column',
	},
}

const Processes = (props: Props) => (
	<div style={styles.container}>
		{props.processes.map(process => (
			<AlifdMessage key={process.title} type="loading" size="medium" title={process.title}>
				{process.description}...
			</AlifdMessage>
		))}
	</div>
)

export default Processes
