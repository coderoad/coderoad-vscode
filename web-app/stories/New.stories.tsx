import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { NewPage } from '../src/containers/New'

storiesOf('New', module).add('Page', () => <NewPage onNew={action('onNew')} />)
