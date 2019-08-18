import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import apolloProvider from './utils/ApolloDecorator'
import ContinuePageContainer, { ContinuePage } from '../src/containers/Continue'

storiesOf('Continue', module)
  .add('Page', () => {
    const tutorial = {
      id: '1',
      title: 'Example Tutorial',
      text: 'Some summary',
    }
    return <ContinuePage tutorial={tutorial} onContinue={action('onContinue')} />
  })
  .addDecorator(apolloProvider)
  .add('Container', () => <ContinuePageContainer />)
