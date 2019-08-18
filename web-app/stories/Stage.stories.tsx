import React from 'react'

import { action } from '@storybook/addon-actions'
import { object, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Stage from '../src/components/Stage'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Stage', () => (
    <Stage
      stage={{
        id: '1',
        title: 'Stage Title',
        text: 'A description of the stage',
        steps: [
          {
            id: '1',
            title: 'Sum',
            text: 'Write a function `sum` that adds two numbers together',
            status: 'COMPLETE',
          },
          {
            id: '2',
            title: 'Multiply',
            text: `Write a function \`multiply\` that multiplies two numbers together

    \`\`\`
    function someExample(a) {
      return a * 1
    }
    \`\`\`
                `,
            status: 'ACTIVE',
          },
          {
            id: '3',
            title: 'Divide',
            text: 'Write a function `divide` that divides',
            status: 'INCOMPLETE',
          },
        ],
      }}
      onContinue={action('onContinue')}
    />
  ))
