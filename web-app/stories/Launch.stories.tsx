import { storiesOf } from '@storybook/react'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import Launch from '../src/containers/Launch'

const styles = {
  container: {},
}

storiesOf('Launch', module)
  .addDecorator(SideBarDecorator)
  .add('LaunchPage', () => (
    <div css={styles.container}>
      <Launch />
    </div>
  ))
