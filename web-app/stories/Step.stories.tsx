import React from 'react'

import { object, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Step from '../src/components/Stage/StepDescription'

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
  .add('Step Markdown', () => (
    <Step
      content={object('content', {
        text: `Markdown included \`code\`, *bold*, & _italics_.
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
`,
      })}
      status={object('status', {
        active: false,
        complete: true,
      })}
    />
  ))
