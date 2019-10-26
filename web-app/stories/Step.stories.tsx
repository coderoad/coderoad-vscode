import React from 'react'

import { select, boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import StepDescription from '../src/containers/Tutorial/LevelPage/Level/StepDescription'

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
  .add('Step Description', () => (
    <StepDescription
      text={text('text', stepText)}
      mode={select('mode', { active: 'ACTIVE', complete: 'COMPLETE', incomplete: 'INCOMPLETE' }, 'active', 'step')}
    />
  ))
  .add('Step Markdown', () => (
    <StepDescription
      text={text('text', paragraphText)}
      mode={select('mode', { active: 'ACTIVE', complete: 'COMPLETE', incomplete: 'INCOMPLETE' }, 'active', 'step')}
    />
  ))
