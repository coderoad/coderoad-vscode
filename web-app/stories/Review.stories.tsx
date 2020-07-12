import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Review from '../src/containers/Tutorial/containers/Review'
import SideBarDecorator from './utils/SideBarDecorator'

const levels = [
  {
    id: '1',
    title: 'First Level',
    summary: 'A summary of the first level',
    content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
    setup: null,
    status: 'COMPLETE' as 'COMPLETE',
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
        hints: ['First Hint', 'Second Hint'],
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
        status: 'COMPLETE',
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
        status: 'COMPLETE',
      },
    ],
  },
  {
    id: '2',
    title: 'The Second Level',
    summary: 'A summary of the 2nd level',
    content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
    setup: null,
    status: 'ACTIVE' as 'ACTIVE',
    steps: [
      {
        id: '2.1',
        content: 'Should support markdown test\n ```shell\nnpn install some-package\n```\nwhew it works!',
        setup: {
          commits: ['abcdefg'],
        },
        solution: {
          commits: ['hijklmn'],
        },
        status: 'COMPLETE',
      },
      {
        id: '2.2',
        content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
        setup: {
          commits: ['abcdefg'],
        },
        solution: {
          commits: ['hijklmn'],
        },
        status: 'ACTIVE',
      },
      {
        id: '2.3',
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
  },
  {
    id: '3',
    title: 'A Third Level',
    summary: 'A summary of the 3rd level',
    content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
    setup: null,
    status: 'INCOMPLETE',
    steps: [
      {
        id: '3.1',
        content: 'Should support markdown test\n ```shell\nnpn install some-package\n```\nwhew it works!',
        setup: {
          commits: ['abcdefg'],
        },
        solution: {
          commits: ['hijklmn'],
        },
        status: 'INCOMPLETE',
      },
      {
        id: '3.2',
        content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
        setup: {
          commits: ['abcdefg'],
        },
        solution: {
          commits: ['hijklmn'],
        },
        status: 'INCOMPLETE',
      },
      {
        id: '3.3',
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
  },
]

storiesOf('Review', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Example', () => {
    const progress = {
      levels: {
        '1': true,
      },
      steps: {
        '1.1': true,
        '1.2': true,
        '1.3': true,
        '2.1': true,
      },
    }
    return <Review levels={levels} progress={progress} />
  })
