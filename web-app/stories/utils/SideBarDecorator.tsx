import * as React from 'react'
import { css, jsx } from '@emotion/core'
import Provider from '../../src/Provider'

const styles = {
  limitedWidthContainer: {
    left: 0,
    top: 0,
    position: 'fixed' as 'fixed',
    borderRight: '1px solid black',
    width: '50rem',
    height: '100%',
    // backgroundColor: 'white',
  },
  container: {
    position: 'relative' as 'relative',
  },
}

const SideBarDecorator = (storyFn) => (
  <Provider>
    <div css={styles.container}>
      <div css={styles.limitedWidthContainer}>{storyFn()}</div>
    </div>
  </Provider>
)

export default SideBarDecorator
