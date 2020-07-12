import React, { Fragment } from 'react'
import { ConfigProvider } from '@alifd/next'
import enUS from '@alifd/next/lib/locale/en-us'

export function Provider({ children }) {
  return (
    <ConfigProvider locale={enUS}>
      <Fragment>{children}</Fragment>
    </ConfigProvider>
  )
}

export default (story) => {
  return <Provider>{story()}</Provider>
}
