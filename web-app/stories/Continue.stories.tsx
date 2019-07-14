import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ContinuePage } from '../src/containers/Continue'
import demo from './data/basic'

storiesOf('Continue', module).add('Page', () => <ContinuePage tutorials={[demo]} onContinue={action('onContinue')} />)
