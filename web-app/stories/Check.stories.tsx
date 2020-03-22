import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SelectWorkspace from '../src/containers/Check/SelectWorkspace'
import SideBarDecorator from './utils/SideBarDecorator'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

storiesOf('Check', module)
  .addDecorator(SideBarDecorator)
  .add('Select Workspace', () => (
    <div css={styles.container}>
      <SelectWorkspace send={action('send')} />
    </div>
  ))
