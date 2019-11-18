import * as React from 'react'
import * as G from 'typings/graphql'
import * as T from 'typings'

import Step from './Step'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import ProcessEvents from '../../../components/ProcessEvents'

const styles = {
	page: {
		position: 'relative' as 'relative',
		display: 'flex' as 'flex',
		flexDirection: 'column' as 'column',
		padding: 0,
		width: '100%',
	},
	header: {
		height: '36px',
		backgroundColor: '#EBEBEB',
		fontSize: '16px',
		lineHeight: '16px',
		padding: '10px 1rem',
	},
	content: {
		padding: '0rem 1rem',
		paddingBottom: '1rem',
	},
	options: {
		padding: '0rem 1rem',
	},
	steps: {
		padding: '1rem 16px',
	},
	title: {
		fontSize: '1.2rem',
		fontWeight: 'bold' as 'bold',
		lineHeight: '1.2rem',
	},
	processes: {
		padding: '0 1rem',
		position: 'absolute' as 'absolute',
		bottom: '36px',
	},
	footer: {
		height: '36px',
		backgroundColor: 'black',
		fontSize: '16px',
		lineHeight: '16px',
		padding: '10px 1rem',
		position: 'absolute' as 'absolute',
		bottom: 0,
		color: 'white',
		width: '100%',
	},
}

interface Props {
	level: G.Level & { status: T.ProgressStatus; index: number; steps: Array<G.Step & { status: T.ProgressStatus }> }
	processes: T.ProcessEvent[]
	onContinue(): void
	onLoadSolution(): void
}

const Level = ({ level, onContinue, onLoadSolution, processes }: Props) => {
	if (!level.steps) {
		throw new Error('No Stage steps found')
	}

	return (
		<div style={styles.page}>
			<div>
				<div style={styles.header}>
					<span>Learn</span>
				</div>
				<div style={styles.content}>
					<h2 style={styles.title}>{level.title}</h2>
					<Markdown>{level.content || ''}</Markdown>
				</div>
			</div>

			<div>
				<div style={styles.header}>Tasks</div>
				<div style={styles.steps}>
					{level.steps.map((step: (G.Step & { status: T.ProgressStatus }) | null, index: number) => {
						if (!step) {
							return null
						}
						return (
							<Step
								key={step.id}
								order={index + 1}
								status={step.status}
								content={step.content}
								onLoadSolution={onLoadSolution}
							/>
						)
					})}
				</div>
			</div>

			<div>
				{level.status === 'COMPLETE' && (
					<div style={styles.options}>
						<Button onClick={onContinue}>Continue</Button>
					</div>
				)}

				{processes.length > 0 && (
					<div style={styles.processes}>
						<ProcessEvents processes={processes} />
					</div>
				)}

				<div>
					<div style={styles.footer}>
						<span>
							{typeof level.index === 'number' ? `${level.index + 1}. ` : ''}
							{level.title}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Level
