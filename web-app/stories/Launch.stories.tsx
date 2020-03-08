import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import LaunchPage from '../src/containers/Launch'

const styles = {
  container: {},
}

storiesOf('Launch', module)
  .addDecorator(SideBarDecorator)
  .add('LaunchPage', () => {
    const tutorial = {
      summary: {
        title: 'Tutorial Title',
        summary: 'Tutorial Summary',
      },
    }
    return (
      <div css={styles.container}>
        <LaunchPage send={action('send')} context={{ tutorial }} />
      </div>
    )
  })
