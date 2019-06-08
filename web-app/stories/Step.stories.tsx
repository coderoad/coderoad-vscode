import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs'
import SideBarDecorator from './utils/SideBarDecorator'

import Step from '../src/components/Step'

const stepText =
  'This is a long paragraph of step text intended to wrap around the side after a short period of writing to demonstrate text wrap among other things'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Step', () => (
    <Step
      content={object('content', {
        text: stepText,
      })}
      status={object('status', {
        active: true,
        complete: false,
      })}
    />
  ))
