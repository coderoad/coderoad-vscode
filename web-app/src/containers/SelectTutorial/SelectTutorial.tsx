import * as React from 'react'
import * as T from 'typings'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import TutorialItem from './TutorialItem'

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

const SelectTutorial = (props: Props) => {
  const onSelect = (tutorial: G.Tutorial) => {
    props.send({
      type: 'SELECT_TUTORIAL',
      payload: {
        tutorial,
      },
    })
  }
  return (
    <div css={styles.page}>
      <div css={styles.header}>
        <span>CodeRoad</span>
      </div>
      <div css={styles.banner}>
        <span>Select a tutorial to launch in this workspace:</span>
      </div>
      <div>
        {props.tutorialList.map((tutorial: G.Tutorial) => (
          <TutorialItem
            key={tutorial.id}
            onSelect={() => onSelect(tutorial)}
            title={tutorial.summary.title || ''}
            description={tutorial.summary.description || ''}
          />
        ))}
      </div>
    </div>
  )
}

export default SelectTutorial
