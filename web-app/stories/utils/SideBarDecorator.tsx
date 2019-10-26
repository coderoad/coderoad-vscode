import * as React from 'react'

const styles = {
  container: {
    position: 'relative' as 'relative',
    boxSizing: 'border-box' as 'border-box',
    maxWidth: '20rem',
    borderRight: '2px solid black',
    width: '20rem',
    height: window.innerHeight,
  },
}

const SideBarDecorator = storyFn => <div style={styles.container}>{storyFn()}</div>

export default SideBarDecorator
