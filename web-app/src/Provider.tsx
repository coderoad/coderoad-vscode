import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { ConfigProvider } from '@alifd/next'
import enUS from '@alifd/next/lib/locale/en-us'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from 'emotion-theming'
import { AdminProvider } from './services/admin/context'
import theme, { Theme } from './styles/theme'

type Props = {
  children: React.ReactElement
}

const styles = {
  page: (theme: Theme) => ({
    display: 'flex' as 'flex',
    position: 'relative' as 'relative',
    margin: 0,
    width: '100vw',
    maxWidth: '100%',
    minHeight: '100vh',
    backgroundColor: theme['$color-white'],
    overflow: 'auto',
  }),
}

const Provider = (props: Props) => (
  /* @ts-ignore invalid in enUS locale typings for @alifd/next@1.20.20 https://github.com/alibaba-fusion/next/commit/e3b934b */
  <ConfigProvider locale={enUS}>
    <div css={styles.page}>
      <AdminProvider>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ErrorBoundary>
      </AdminProvider>
    </div>
  </ConfigProvider>
)

export default Provider
