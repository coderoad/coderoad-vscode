import * as E from '../../typings/error'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ErrorView from '../src/components/Error'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Error', module)
  .addDecorator(SideBarDecorator)
  .add('Error', () => {
    const error: E.ErrorMessage = {
      type: 'UnknownError',
      message: '### Message summary\n\nSome message about what went wrong under here',
      actions: [
        { label: 'First', transition: 'FIRST' },
        { label: 'Second', transition: 'SECOND' },
      ],
    }
    return <ErrorView error={error} send={action('send')} />
  })
