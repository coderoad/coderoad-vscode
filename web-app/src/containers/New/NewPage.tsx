import * as React from 'react'
import * as G from 'typings/graphql'
import TutorialList from './TutorialList'

const styles = {
  page: {
    width: '100%',
  },
  header: {
    height: '36px',
    backgroundColor: '#EBEBEB',
    fontSize: '16px',
    lineHeight: '16px',
    padding: '10px 1rem',
  },
  banner: {
    height: '50px',
    fontSize: '1rem',
    padding: '1rem',
  },
}

interface Props {
  tutorialList: G.Tutorial[]
}

const NewPage = (props: Props) => (
  <div style={styles.page}>
    <div style={styles.header}>
      <span>CodeRoad</span>
    </div>
    <div style={styles.banner}>
      <span>Select a Tutorial to Start</span>
    </div>
    <TutorialList tutorialList={props.tutorialList} />
  </div>
)

export default NewPage
