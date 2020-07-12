import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { Provider } from './ProviderDecorator'

const styles = {
  container: {
    left: '25rem',
    position: 'absolute' as 'absolute',
    boxSizing: 'border-box' as 'border-box',
    borderLeft: '2px solid black',
    borderRight: '2px solid black',
    width: '50rem',
    height: window.innerHeight,
    backgroundColor: 'white',
  },
}

const SideBarDecorator = (storyFn) => (
  <Provider>
    <div css={styles.container}>{storyFn()}</div>
  </Provider>
)

export default SideBarDecorator
