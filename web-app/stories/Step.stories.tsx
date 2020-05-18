import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Step from '../src/containers/Tutorial/components/Step'
import SideBarDecorator from './utils/SideBarDecorator'

const stepText =
  'This is a long paragraph of step text intended to wrap around the side after a short period of writing to demonstrate text wrap among other things'

const paragraphText = `
  ### Code

  Inline code: \`<h1>HTML</h1>\`, \`function someFunc() { var a = 1; return a; }\`

  \`\`\`javascript
  var a = 12

  function example(a) {
    return a + 1
  }
  \`\`\`

  ### Headers

  # h1
  ## h2
  ### h3
  #### h4
  ##### h5

  ### Emojis

  :) :| :(

  ### Text Formatting

  **bold**, *italics*, ~~strikethrough~~

  ### BlockQuote

  > A quote here

  ### Tables
  | First Header  | Second Header |
  | ------------- | ------------- |
  | Content Cell  | Content Cell  |
  | Content Cell  | Content Cell  |

  

  | Left-aligned | Center-aligned | Right-aligned |
  | :---         |     :---:      |          ---: |
  | git status   | git status     | git status    |
  | git diff     | git diff       | git diff      |
  `

storiesOf('Step', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Active Step', () => (
    <Step
      order={1}
      content={text('text', stepText)}
      status="ACTIVE"
      onLoadSolution={action('onLoadSolution')}
      subtasks={null}
    />
  ))
  .add('Step Markdown', () => (
    <Step
      order={2}
      content={text('text', paragraphText)}
      status={select('mode', { ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE', INCOMPLETE: 'INCOMPLETE' }, 'ACTIVE', 'step')}
      onLoadSolution={action('onLoadSolution')}
      subtasks={null}
    />
  ))
  .add('Substasks', () => (
    <Step
      order={2}
      content={'A task with subtasks'}
      status={select('mode', { ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE', INCOMPLETE: 'INCOMPLETE' }, 'ACTIVE', 'step')}
      onLoadSolution={action('onLoadSolution')}
      subtasks={[
        {
          name: 'First Test',
          pass: false,
        },
        {
          name: 'Second Test',
          pass: true,
        },
        {
          name: 'Third Test',
          pass: false,
        },
      ]}
    />
  ))
