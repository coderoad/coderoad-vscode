import * as React from 'react'

const styles = {
  width: '20rem',
  borderRight: '2px solid black',
  height: window.innerHeight,
}

const SideBarDecorator = storyFn => <div style={styles}>{storyFn()}</div>

export default SideBarDecorator
