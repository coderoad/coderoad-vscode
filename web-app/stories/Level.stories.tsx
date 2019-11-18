import React from 'react'
import * as G from '../../typings/graphql'
import * as T from '../../typings'

import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import SideBarDecorator from './utils/SideBarDecorator'
import Level from '../src/containers/Tutorial/LevelPage/Level'

type ModifiedLevel = G.Level & {
	status: T.ProgressStatus
	index: number
	steps: Array<G.Step & { status: T.ProgressStatus }>
}

storiesOf('Level', module)
	.addDecorator(SideBarDecorator)
	.addDecorator(withKnobs)
	.add('Level', () => {
		const level = {
			id: 'L1',
			index: 0,
			title: 'A Title',
			description: 'A summary of the level',
			content: 'Some content here in markdown',
			setup: null,
			status: 'ACTIVE',
			steps: [
				{
					id: 'L1:S1',
					title: 'First Step',
					content: 'First step description',
					setup: {
						id: 'L1:S1:SETUP',
						commits: ['abcdefg'],
					},
					solution: {
						id: 'L1:S1:SOLUTION',
						commits: ['hijklmn'],
					},
					status: 'COMPLETE',
				},
				{
					id: 'L1:S2',
					title: 'Second Step',
					content: 'Second step description',
					setup: {
						id: 'L1:S2:SETUP',
						commits: ['abcdefg'],
					},
					solution: {
						id: 'L1:S2:SOLUTION',
						commits: ['hijklmn'],
					},
					status: 'ACTIVE',
				},
				{
					id: 'L1:S3',
					title: 'Third Step',
					content: 'Third step description',
					setup: {
						id: 'L1:S3:SETUP',
						commits: ['abcdefg'],
					},
					solution: {
						id: 'L1:S3:SOLUTION',
						commits: ['hijklmn'],
					},
					status: 'INCOMPLETE',
				},
			],
		}
		return (
			<Level level={level} onContinue={action('onContinue')} onLoadSolution={action('onLoadSolution')} processes={[]} />
		)
	})
	.add('Level 2', () => {
		const level = {
			id: 'L1',
			index: 1,
			title: 'A Title',
			description: 'A description',
			content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
			setup: { commits: ['77e57cd'], commands: ['npm install'], files: [] },
			steps: [
				{
					id: 'L1:S1',
					content: 'Should support markdown test\n ```shell\nnpn install some-packagen```\nwhew it works!',
					setup: { commits: ['a4679b1'], commands: [], files: ['package.json'] },
					solution: {
						commits: ['7c64508'],
						commands: ['npm install'],
						files: ['package.json'],
					},
					status: 'ACTIVE',
				},
				{
					id: 'L1:S2',
					content: 'Should support markdown test\n ```ts\nvar a = 1\n```\nwhew it works!',
					setup: { commits: ['8a8a5cb'], commands: [], files: ['src/main.ts'] },
					solution: { commits: ['c2f7973'], commands: [], files: ['src/main.ts'] },
					status: 'INCOMPLETE',
				},
				{
					id: 'L1:S3',
					content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
					setup: { commits: ['992bcb1'], commands: [], files: ['src/main.ts'] },
					solution: { commits: ['1b92779'], commands: [], files: ['src/main.ts'] },
					status: 'INCOMPLETE',
				},
				{
					id: 'L1:S4',
					content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
					setup: { commits: ['be32adb'], commands: [], files: ['src/main.ts'] },
					solution: { commits: ['7fe26cb'], commands: [], files: ['src/main.ts'] },
					status: 'INCOMPLETE',
				},
			],
			status: 'ACTIVE',
		}
		return (
			<Level
				level={level}
				onContinue={action('onContinue')}
				onLoadSolution={action('onLoadSolution')}
				processes={[
					{
						title: 'npm install',
						description: 'Installing dependencies',
					},
				]}
			/>
		)
	})
