import React from 'react'
import * as G from '../../typings/graphql'

import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import SideBarDecorator from './utils/SideBarDecorator'
import Level from '../src/containers/Tutorial/LevelPage/Level/index'

storiesOf('Level', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Level', () => {
    const level: G.Level & { index: number } = {
      id: 'L1',
      index: 2,
      title: 'A Title',
      description: 'Some description',
      setup: null,
      status: 'ACTIVE',
      steps: [
        {
          id: 'L1:S1',
          title: 'First Step',
          description: 'First step description',
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
          description: 'Second step description',
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
          description: 'Third step description',
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
    return <Level level={level} onContinue={action('onContinue')} onLoadSolution={action('onLoadSolution')} />
  })
