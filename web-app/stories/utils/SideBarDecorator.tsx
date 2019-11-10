import * as React from 'react'

const styles = {
  container: {
    position: 'relative' as 'relative',
    boxSizing: 'border-box' as 'border-box',
    borderRight: '2px solid black',
    width: '100%',
    height: window.innerHeight,
  },
}

const SideBarDecorator = storyFn => <div style={styles.container}>{storyFn()}</div>

export default SideBarDecorator
