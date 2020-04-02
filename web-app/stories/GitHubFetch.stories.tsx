import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SideBarDecorator from './utils/SideBarDecorator'
import SelectTutorialPage from '../src/containers/SelectTutorial'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

storiesOf('GitHub Fetch', module)
  .addDecorator(SideBarDecorator)
  .add('Select Tutorial', () => {
    return <SelectTutorialPage send={action('send')} context={{}} />
  })
