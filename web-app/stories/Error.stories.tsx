import * as E from '../../typings/error'
import React from 'react'
import ErrorView from '../src/components/Error'

const Error = ({ send }) => {
  const error: E.ErrorMessage = {
    type: 'UnknownError',
    message: '### Message summary\n\nSome message about what went wrong under here',
    actions: [
      { label: 'First', transition: 'FIRST' },
      { label: 'Second', transition: 'SECOND' },
    ],
  }
  return <ErrorView error={error} send={send} />
}

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Error',
  component: ErrorView,
  argTypes: { send: { action: 'send' } },
}

export const Primary = () => <Error />
