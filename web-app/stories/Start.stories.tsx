import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import { StartPage } from '../src/containers/Start'

const styles = {
  container: {},
}

storiesOf('Start', module)
  .addDecorator(SideBarDecorator)
  .add('New', () => {
    return (
      <div css={styles.container}>
        <StartPage onNew={action('onNew')} onContinue={action('onContinue')} />
      </div>
    )
  })
  .add('Continue', () => {
    const tutorial = {
      summary: {
        title: 'Tutorial Title With A Really Long Name',
        summary: 'Tutorial Summary',
      },
    }
    return (
      <div css={styles.container}>
        <StartPage onNew={action('onNew')} onContinue={action('onContinue')} tutorial={tutorial} progress={20} />
      </div>
    )
  })
