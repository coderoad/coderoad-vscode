import * as TT from '../../typings/tutorial'
import { linkTo } from '@storybook/addon-links'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import OverViewPage from '../src/containers/SelectTutorial/TutorialOverview'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Overview', module)
  .addDecorator(SideBarDecorator)
  .add('OverView Page', () => {
    const tutorial: TT.Tutorial = {
      id: '1',
      version: '0.1.0',
      config: {
        appVersions: {
          vscode: '0.1.0',
        },
        testRunner: { command: '', args: { tap: '' } },
        repo: { uri: '', branch: 'master' },
      },
      summary: {
        title: 'Manage NPM package.json',
        description: 'Learn to use the package manager at the core of JavaScript projects',
      },
      levels: [
        {
          id: 'L1',
          title: 'The First Level. `Markdown` supported here.',
          summary: 'A Summary of the first level. `Markdown` supported here.',
          content: '',
          steps: [],
        },
        {
          id: 'L2',
          title: 'The Second Level',
          summary: 'A Summary of the second level',
          content: '',
          steps: [],
        },
        {
          id: 'L3',
          title: 'The Third Level',
          summary: 'A Summary of the third level',
          content: '',
          steps: [],
        },
        {
          id: 'L4',
          title: 'The Fourth Level',
          summary: 'A Summary of the fourth level',
          content: '',
          steps: [],
        },
        {
          id: 'L5',
          title: 'The Fifth Level',
          summary: 'A Summary of the fifth level',
          content: '',
          steps: [],
        },
        {
          id: 'L6',
          title: 'The Sixth Level',
          summary: 'A Summary of the sixth level',
          content: '',
          steps: [],
        },
      ],
    }
    return <OverViewPage tutorial={tutorial} onClear={action('clear')} onNext={linkTo('Tutorial SideBar', 'Level')} />
  })
