import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import NewUserExperienceTutorial from '../src/components/NewUserExperience/NuxTutorial'

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}

storiesOf('NewUserExperience', module)
  .addDecorator(SideBarDecorator)
  .add('NUXTutorial', () => (
    <div css={styles.container}>
      <NewUserExperienceTutorial onLoadSolution={action('onLoadSolution')} />
    </div>
  ))
