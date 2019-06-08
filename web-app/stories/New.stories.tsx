import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import New from '../src/components/New'

storiesOf('New', module).add('Page', () => <New onNew={action('onNew')} />)
