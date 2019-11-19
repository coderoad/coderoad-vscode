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
	.add('FakeBook API L1', () => {
		const level = {
			id: 'L1',
			title: 'Server Setup',
			description: 'Configure a GraphQL server using Apollo Server.',
			content:
				'Apollo Server is a popular and easy to configure GraphQL server.\n[Apollo Server](https://www.apollographql.com/docs/apollo-server/ee7fbac9c0ca5b1dd6aef886bb695e63/index-diagram.svg)\nBy the end of this lesson you should have your own working server started.',
			setup: {
				commits: ['6adeb95'],
				commands: ['npm install'],
			},
			steps: [
				{
					id: 'L1:S1',
					content:
						'Start by installing the apollo server dependencies. In a terminal, run:\n ```shell\nnpm install --save apollo-server graphql\n```',
					setup: {
						files: ['package.json'],
						commits: ['b904b87'],
						watchers: ['./node_modules/{apollo-server,graphql}/package.json'],
					},
					solution: {
						files: ['package.json'],
						commits: ['ad87a86'],
						commands: ['npm install'],
					},
				},
				{
					id: 'L1:S2',
					content:
						'Setup your Apollo Server in `src/main.ts`. Notice that the GraphQL requires two elements: `typeDefs` & `resolvers` - more on these later.\nConfigure the server in the following way:\n```ts\nexport const server = new ApolloServer({\n  typeDefs,\n  resolvers,\n})\n```',
					setup: {
						files: ['src/main.ts'],
						commits: ['13d8c60'],
					},
					solution: {
						files: ['src/main.ts'],
						commits: ['3dd3500'],
					},
				},
				{
					id: 'L1:S3',
					content:
						'Internally, Apollo is really running an [Express](https://expressjs.com/) server.\nTo start the server call `listen`.\n ```shell\nserver.listen(4000)\n```',
					setup: {
						files: ['src/main.ts'],
						commits: ['1d55cc5'],
					},
					solution: {
						files: ['src/main.ts'],
						commits: ['c92311f'],
					},
				},
				{
					id: 'L1:S4',
					content:
						'GraphQL playground is a UI for viewing your schema & docs and testing queries.\nThe playground can be easily configured, just specify `playground: true` in the config.\n```js\nApolloServer({\n  /*...*/\n  playground: true,\n})\n```\nVisit http://localhost:4000/graphql to see the playground in action.',
					setup: {
						files: ['src/main.ts'],
						commits: ['50da94e'],
					},
					solution: {
						files: ['src/main.ts'],
						commits: ['865b805'],
					},
				},
			],
		}
		return (
			<Level level={level} onContinue={action('onContinue')} onLoadSolution={action('onLoadSolution')} processes={[]} />
		)
	})
	.add('FakeBook API L2', () => {
		const level = {
			id: 'L2',
			title: 'TypeDefs & Resolvers',
			description: 'Build endpoints for a User',
			content: 'Something about typeDefs & resolvers',
			setup: {
				commits: ['0d7543c'],
				commands: ['npm install'],
			},
			steps: [
				{
					id: 'L2:S1',
					content: 'Setup typeDefs for viewer',
					setup: {
						files: ['src/typeDefs.ts'],
						commits: ['76890db'],
					},
					solution: {
						commits: ['c5ee208'],
					},
				},
				{
					id: 'L2:S2',
					content: 'viewer resolvers',
					setup: {
						files: ['src/resolvers.ts'],
						commits: ['646f930'],
					},
					solution: {
						commits: ['f382098'],
					},
				},
				{
					id: 'L2:S3',
					content: 'User friends typeDefs',
					setup: {
						files: ['src/typeDefs.ts'],
						commits: ['f00e6e6'],
					},
					solution: {
						commits: ['04fb044'],
					},
				},
				{
					id: 'L2:S3',
					content: 'User friends resolver',
					setup: {
						files: ['src/resolvers.ts'],
						commits: ['932a621'],
					},
					solution: {
						commits: ['bd79f75'],
					},
				},
			],
		}
		return (
			<Level level={level} onContinue={action('onContinue')} onLoadSolution={action('onLoadSolution')} processes={[]} />
		)
	})
