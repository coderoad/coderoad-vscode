import React from 'react'

import { object, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import apolloProvider from './utils/ApolloDecorator'
import Level from '../src/components/Level'
import LevelSummaryPageContainer, { LevelSummaryPage } from '../src/containers/Tutorial/LevelPage'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Level', () => (
    <Level
      level={object('level', {
        id: '1',
        title: 'Sum Level',
        text: 'A description of this stage',
        stages: [
          {
            id: '1',
            title: 'First',
            text: 'some description',
            status: 'COMPLETED',
          },
          {
            id: '2',
            title: 'Second',
            text: 'The second one',
            status: 'ACTIVE',
          },
          {
            id: '3',
            title: 'Third',
            text: 'The third one',
            status: 'INCOMPLETE',
          },
        ],
      })}
      onNext={linkTo('Tutorial SideBar', 'Stage')}
      onBack={linkTo('TUtorial SideBar', 'Summary')}
    />
  ))
  .add('Level Summary', () => {
    return (
      <LevelSummaryPage
        send={action('send')}
        level={{
          id: '1',
          title: 'Sum Level',
          text: 'A description of this stage',
          stages: [
            {
              id: '1',
              title: 'First',
              text: 'some description',
              status: 'COMPLETE',
            },
            {
              id: '2',
              title: 'Second',
              text: 'The second one',
              status: 'ACTIVE',
            },
            {
              id: '3',
              title: 'Third',
              text: 'The third one',
              status: 'INCOMPLETE',
            },
          ],
        }}
      />
    )
  })
  .addDecorator(apolloProvider)
  .add('Level Summary Container', () => {
    return <LevelSummaryPageContainer send={action('send')} />
  })
