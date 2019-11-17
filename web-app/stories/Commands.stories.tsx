import React from 'react'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Processes from '../src/components/Processes'

const styles = {
	container: {
		display: 'flex' as 'flex',
		flexDirection: 'column' as 'column',
	},
}

storiesOf('Components', module)
	.addDecorator(SideBarDecorator)
	.add('Processes', () => (
		<Processes
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
