import { storiesOf } from '@storybook/react'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import Message from '../src/components/Message'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

storiesOf('Test Notification', module)
  .addDecorator(SideBarDecorator)
  .add('Toast', () => {
    return (
      <div css={styles.container}>
        <Message title="Test" closeable />
      </div>
    )
  })
