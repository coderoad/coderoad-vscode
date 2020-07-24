import { action } from '@storybook/addon-actions'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Step from '../src/containers/Tutorial/components/Step'
import Hints from '../src/containers/Tutorial/components/Hints'
import SideBarDecorator from './utils/SideBarDecorator'

const stepText =
  'This is a long paragraph of step text intended to wrap around the side after a short period of writing to demonstrate text wrap among other things\n\nIt has a second paragraph'

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
  .add('Active Step', () => <Step content={text('text', stepText)} status="ACTIVE" subtasks={null} />)
  .add('Fail Step', () => <Step content={text('text', stepText)} status="FAIL" subtasks={null} />)
  .add('Step Markdown', () => (
    <Step
      content={text('text', paragraphText)}
      status={select('mode', { ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE', INCOMPLETE: 'INCOMPLETE' }, 'ACTIVE', 'step')}
      subtasks={null}
    />
  ))
  .add('Subtasks', () => (
    <Step
      content={'A task with subtasks'}
      status={select('mode', { ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE', INCOMPLETE: 'INCOMPLETE' }, 'ACTIVE', 'step')}
      subtasks={[
        {
          name: 'First Test',
          status: 'ACTIVE',
        },
        {
          name: 'Second Test',
          status: 'COMPLETE',
        },
        {
          name: 'Third Test',
          status: 'ACTIVE',
        },
      ]}
    />
  ))
  .add('Hints', () => (
    <>
      <Step content={text('text', stepText)} status="ACTIVE" subtasks={null} />
      <Hints hints={['First hint!', 'Second hint!']} hintIndex={1} setHintIndex={action('setHintIndex')} />
    </>
  ))
