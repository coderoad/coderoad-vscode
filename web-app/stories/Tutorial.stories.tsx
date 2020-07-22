import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import * as T from '../../typings'
import Tutorial from '../src/containers/Tutorial'
import SideBarDecorator from './utils/SideBarDecorator'

const context: Partial<T.MachineContext> = {
  env: { machineId: '', sessionId: '', token: '' },
  error: null,
  processes: [],
  testStatus: null,
  tutorial: {
    id: '',
    version: '0.1.0',
    config: {
      appVersions: { vscode: '0.1.0' },
      testRunner: {
        command: '',
        args: { tap: '' },
      },
      repo: {
        branch: '',
        uri: '',
      },
    },
    summary: {
      title: 'Example Title',
      description: 'An example description',
    },
    levels: [
      {
        id: '1',
        title: 'First Level',
        summary: 'A summary of the first level',
        content:
          'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!\nShould support markdown test\n ```js\nvar a = 1\n```\nwhew it works!\nShould support markdown test\n ```js\nvar a = 1\n```\nwhew it works!\nShould support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
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
            hints: ['First Hint', 'Second Hint'],
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
            hints: ['first hint', 'second hint'],
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
            hints: ['another hint', 'another other hint'],
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
          },
        ],
      },
      {
        id: '3',
        title: 'A Third Level',
        summary: 'A summary of the 3rd level',
        content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
        setup: null,
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
          },
        ],
      },
    ],
  },
}

storiesOf('Tutorial', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('1.1 Start', () => {
    const firstLevel = {
      ...context,
      position: { levelId: '1', stepId: '1.2' },
      progress: { levels: {}, steps: {}, complete: false },
    }
    return <Tutorial state="Normal" context={firstLevel} send={action('send')} />
  })
  .add('1.3 Level Complete', () => {
    const levelComplete = {
      ...context,
      position: { levelId: '1', stepId: '1.2' },
      progress: { levels: {}, steps: { '1.1': true }, complete: false },
    }
    return <Tutorial state="LevelComplete" context={levelComplete} send={action('send')} />
  })
  .add('3.1 Level Start', () => {
    const newLevel = {
      ...context,
      position: { levelId: '1', stepId: '1.2' },
      progress: { levels: { '1': true, '2': true }, steps: {}, complete: false },
    }
    return <Tutorial state="Normal" context={newLevel} send={action('send')} />
  })
  .add('3.3 Final', () => {
    const lastLevel = {
      ...context,
      position: { levelId: '3', stepId: '3.3' },
      progress: { levels: { '3': true }, steps: { '3.3': true }, complete: true },
    }
    return <Tutorial state="LevelComplete" context={lastLevel} send={action('send')} />
  })
