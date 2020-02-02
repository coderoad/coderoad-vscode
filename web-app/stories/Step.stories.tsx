import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Step from '../src/containers/Tutorial/LevelPage/Step'
import SideBarDecorator from './utils/SideBarDecorator'

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

storiesOf('Level', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Active Step', () => (
    <Step order={1} content={text('text', stepText)} status="ACTIVE" onLoadSolution={action('onLoadSolution')} />
  ))
  .add('Step Markdown', () => (
    <Step
      order={2}
      content={text('text', paragraphText)}
      status={select('mode', { ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE', INCOMPLETE: 'INCOMPLETE' }, 'ACTIVE', 'step')}
      onLoadSolution={action('onLoadSolution')}
    />
  ))
