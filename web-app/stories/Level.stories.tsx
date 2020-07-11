import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Level from '../src/containers/Tutorial/components/Level'
import SideBarDecorator from './utils/SideBarDecorator'

const level = {
  id: '1',
  title: 'A Title',
  summary: 'A summary of the level',
  content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
  setup: null,
  status: 'ACTIVE' as 'ACTIVE',
  steps: [
    {
      id: '1.1',
      content: 'Should support markdown test\n ```shell\nnpn install some-package\n```\nwhew it works!',
      setup: {
        commits: ['abcdefg'],
      },
      solution: {
        commits: ['hijklmn'],
      },
      status: 'COMPLETE',
      hints: ['first hint', 'second hint'],
    },
    {
      id: '1.2',
      content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
      setup: {
        commits: ['abcdefg'],
      },
      solution: {
        commits: ['hijklmn'],
      },
      status: 'ACTIVE',
      hints: ['more hint action', 'another second hint'],
    },
    {
      id: '1.3',
      content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
      setup: {
        commits: ['abcdefg'],
      },
      solution: {
        commits: ['hijklmn'],
      },
      status: 'INCOMPLETE',
    },
  ],
}

storiesOf('Level', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Level', () => <Level level={level} />)
  .add('Level 2', () => <Level level={level} />)
  .add('No steps', () => (
    <Level level={{ id: '1', title: 'No Step Level', content: 'No steps in this one', steps: [], status: 'ACTIVE' }} />
  ))
  .add('No lesson', () => <Level level={{ id: '1', title: 'No Step Level', content: '', steps: level.steps }} />)
