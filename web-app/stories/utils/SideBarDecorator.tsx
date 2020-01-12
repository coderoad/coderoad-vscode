import * as React from 'react'

const styles = {
  container: {
    left: '25rem',
    position: 'absolute' as 'absolute',
    boxSizing: 'border-box' as 'border-box',
    borderLeft: '2px solid black',
    borderRight: '2px solid black',
    width: '50rem',
    height: window.innerHeight,
    backgroundColor: 'yellow',
  },
}

const SideBarDecorator = storyFn => <div css={styles.container}>{storyFn()}</div>

export default SideBarDecorator
