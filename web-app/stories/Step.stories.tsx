import React from 'react'

import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Step from '../src/containers/Tutorial/StagePage/Stage/StepDescription'

const stepText =
  'This is a long paragraph of step text intended to wrap around the side after a short period of writing to demonstrate text wrap among other things'

const paragraphText = `Markdown included \`code\`, *bold*, & _italics_.
  \`\`\`javascript
  var a = 12
  
  function example(a) {
    return a + 1
  }
  \`\`\`
  
  Headers can be added:
  
  # h1
  ## h2
  ### h3
  #### h4
  ##### h5
  
  Emojis: :) :| :(
  `

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Step', () => <Step text={text('text', stepText)} hide={boolean('hide', false)} />)
  .add('Step Markdown', () => <Step text={text('text', paragraphText)} hide={boolean('hide', false)} />)
