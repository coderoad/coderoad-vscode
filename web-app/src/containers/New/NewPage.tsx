import * as React from 'react'
import * as T from 'typings'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import TutorialList from './TutorialList'

const styles = {
  page: {
    position: 'relative' as 'relative',
    width: '100%',
  },
  header: {
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
  },
  banner: {
    height: '3rem',
    fontSize: '1rem',
    padding: '1rem',
  },
}

interface Props {
  send(action: T.Action): void
  tutorialList: G.Tutorial[]
}

const NewPage = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.header}>
      <span>CodeRoad</span>
    </div>
    <div css={styles.banner}>
      <span>Select a Tutorial to Start</span>
    </div>
    <TutorialList tutorialList={props.tutorialList} send={props.send} />
  </div>
)

export default NewPage
