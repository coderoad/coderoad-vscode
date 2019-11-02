import React from 'react'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Checkbox from '../src/components/Checkbox'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

storiesOf('Checkbox', module)
  .addDecorator(SideBarDecorator)
  .add('Checkboxes', () => (
    <div style={styles.container}>
      <span>
        <Checkbox status="COMPLETE" /> Checked
      </span>
      <span>
        <Checkbox status="INCOMPLETE" /> Unchecked
      </span>
      <span>
        <Checkbox status="LOADING" /> Loading
      </span>
    </div>
  ))
