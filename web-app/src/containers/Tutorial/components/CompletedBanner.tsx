import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { Icon } from '@alifd/next'

const styles = {
  banner: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'rgb(85, 132, 255)',
    color: 'white',
    padding: '0.5rem',
  },
  header: {
    position: 'relative' as 'relative',
    width: '100%',
  },
  headerMessage: {
    marginLeft: '0.5rem',
  },
  // close: {
  //   position: 'absolute' as 'absolute',
  //   right: '0.5rem',
  //   top: '0.5rem',
  //   padding: '2px',
  // },
  section: {
    padding: '0rem 0.5rem 1rem 0.5rem',
  },
}

interface Props {
  title: string
}

const CompletedBanner = (props: Props) => {
  return (
    <div css={styles.banner}>
      <div css={styles.header}>
        {/* <div css={styles.close} onClick={() => setOpen(false)}>
          <Icon type="close" size="xs" />
        </div> */}
        <h3>
          <Icon type="success-filling" size="large" />
          <span css={styles.headerMessage}>Congratulations on completing "{props.title}"!</span>
        </h3>
      </div>
      <div css={styles.section}>
        <h5>You've reached the end of the road...</h5>
        <p>To go down another path:</p>
        <ul>
          <li>- open a new VSCode workspace</li>
          <li>- relaunch the CodeRoad app</li>
          <li>- select a new tutorial</li>
        </ul>
      </div>
    </div>
  )
}

export default CompletedBanner
