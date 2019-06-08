import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Continue from '../src/components/Continue'
import demo from './data/basic'

storiesOf('Continue', module).add('Page', () => <Continue tutorials={[demo]} onContinue={action('onContinue')} />)
