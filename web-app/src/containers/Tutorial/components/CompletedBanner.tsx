import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { Button, Icon } from '@alifd/next'
import { Theme } from '../../../styles/theme'

const styles = {
  banner: (theme: Theme) => ({
    height: 'auto',
    width: '100%',
    backgroundColor: theme['$color-brand1-9'],
    color: theme['$color-white'],
    padding: '0.5rem 1rem',
  }),
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
  options: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
  },
  optionsLeft: {
    flex: 3,
  },
  optionsRight: {
    flex: 1,
    display: 'flex' as 'flex',
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'flex-end' as 'flex-end',
  },
}

interface Props {
  title: string
  onRequestWorkspace(): void
}

const CompletedBanner = (props: Props) => {
  return (
    <div css={styles.banner}>
      <div css={styles.header}>
        <h3>
          <Icon type="success-filling" size="large" />
          <span css={styles.headerMessage}>Congratulations on completing "{props.title}"!</span>
        </h3>
      </div>
      <div css={styles.section}>
        <h5>You've reached the end of the road...</h5>
        <div css={styles.options}>
          <div css={styles.optionsLeft}>
            <p>To go down another path:</p>
            <ul>
              <li>- open a new VSCode workspace</li>
              <li>- relaunch the CodeRoad app</li>
              <li>- select a new tutorial</li>
            </ul>
          </div>
          <div css={styles.optionsRight}>
            <Button type="primary" ghost="dark" onClick={props.onRequestWorkspace}>
              Open New Workspace
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletedBanner
