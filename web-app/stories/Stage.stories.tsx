import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object, boolean } from '@storybook/addon-knobs'
import SideBarDecorator from './utils/SideBarDecorator'
import demo from './data/basic'

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
            text: 'Write a function that adds two numbers together',
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
            text: 'Write a function that multiplies two numbers together',
          },
          hints: [],
          status: { active: true, complete: false },
        },
        step3Id: {
          content: {
            title: 'Divide',
            text: 'Write a function that divides',
          },
          hints: [],
          status: { active: false, complete: false },
        },
      })}
      stage={object('stage', demo.data.stages['stage1Id'])}
      complete={boolean('complete', false)}
      onNextStage={action('onNextStage')}
    />
  ))
