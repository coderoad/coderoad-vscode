import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import StartPage from '../src/containers/Start'

const styles = {
  container: {},
}

storiesOf('Start', module)
  .addDecorator(SideBarDecorator)
  .add('StartPage', () => {
    const tutorial = {
      summary: {
        title: 'Tutorial Title',
        summary: 'Tutorial Summary',
      },
    }
    return (
      <div css={styles.container}>
        <StartPage send={action('send')} context={{ tutorial }} />
      </div>
    )
  })
