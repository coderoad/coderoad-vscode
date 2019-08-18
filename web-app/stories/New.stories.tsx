import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import * as T from '../../typings/graphql'
import apolloProvider from './utils/ApolloDecorator'

import TutorialList from '../src/components/TutorialList'
import TutorialItem from '../src/components/TutorialList/TutorialItem'
import NewContainer from '../src/containers/New'

storiesOf('New', module)
  .add('Tutorial', () => {
    const tutorial: T.Tutorial = {
      id: '1',
      title: 'Tutorial 1',
      text: 'The first one',
    }
    return <TutorialItem onNew={action('onNew')} title={tutorial.title} text={tutorial.text} />
  })
  .add('TutorialList', () => {
    const tutorialList: T.Tutorial[] = [
      {
        id: '1',
        title: 'Tutorial 1',
        text: 'The first one',
      },
      {
        id: '2',
        title: 'Tutorial 2',
        text: 'The second one',
      },
    ]
    return <TutorialList tutorialList={tutorialList} onNew={action('onNew')} />
  })
  .addDecorator(apolloProvider)
  .add('Container', () => <NewContainer />)
