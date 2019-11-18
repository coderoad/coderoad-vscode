import React from 'react'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import ProcessEvents from '../src/components/ProcessEvents'

const styles = {
	container: {
		display: 'flex' as 'flex',
		flexDirection: 'column' as 'column',
	},
}

storiesOf('Components', module)
	.addDecorator(SideBarDecorator)
	.add('Processes', () => (
		<ProcessEvents
			processes={[
				{
					title: 'npm install',
					description: 'CLI Setup running',
				},
				{
					title: 'npm test',
					description: 'Test running',
				},
			]}
		/>
	))
