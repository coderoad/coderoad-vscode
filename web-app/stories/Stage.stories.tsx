import React from 'react'

import { action } from '@storybook/addon-actions'
import { boolean, object, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import demo from './data/basic'
import SideBarDecorator from './utils/SideBarDecorator'

import Stage from '../src/components/Stage'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Stage', () => (
    <Stage
      steps={object('steps', {
        step1Id: {
          content: {
            title: 'Sum',
            text: 'Write a function `sum` that adds two numbers together',
          },
          hints: [],
          status: {
            active: false,
            complete: true,
          },
        },
        step2Id: {
          content: {
            title: 'Multiply',
            text: `Write a function \`multiply\` that multiplies two numbers together

\`\`\`
function someExample(a) {
  return a * 1
}
\`\`\`
            `,
          },
          hints: [],
          status: { active: true, complete: false },
        },
        step3Id: {
          content: {
            title: 'Divide',
            text: 'Write a function `divide` that divides',
          },
          hints: [],
          status: { active: false, complete: false },
        },
      })}
      stage={object('stage', demo.data.stages.stage1Id)}
      complete={boolean('complete', false)}
      onNextStage={action('onNextStage')}
    />
  ))
