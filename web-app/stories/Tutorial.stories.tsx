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
  position: { levelId: '2', stepId: '2.2' },
  progress: { levels: { '1': true }, steps: { '1.1': true, '1.2': true, '1.3': true, '2.1': true }, complete: false },
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
  .add('1 step', () => {
    const firstLevel = {
      ...context,
      position: { levelId: '1', stepId: '1.2' },
      progress: { levels: {}, steps: {}, complete: false },
    }
    return <Tutorial state="Normal" context={firstLevel} send={action('send')} />
  })
  .add('3 step', () => <Tutorial state="Normal" context={context} send={action('send')} />)
