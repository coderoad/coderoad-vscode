import * as React from 'react'
import * as G from 'typings/graphql'

import Markdown from '../../../../components/Markdown'

const styles = {
  card: {
    display: 'grid',
    gridTemplateAreas: 'Content Icon',
    gridTemplateColumns: '1fr 1.5rem',
    gridTemplateRows: '1fr',
    marginRight: '1.5rem',
  },
  continueIcon: {
    color: '#1890ff',
  },
  left: {},
  right: {
    alignSelf: 'center',
    justifySelf: 'center',
    marginBottom: '1rem',
  },
}

interface Props {
  stage: G.Stage
  onNext(): void
}

const LevelStageSummary = (props: Props) => {
  const { stage, onNext } = props
  const active = stage.status === 'ACTIVE'
  return (
    <div style={styles.card} className={active ? 'hover-select' : ''} onClick={onNext}>
      <div style={styles.left}>
        <Markdown>{stage.text || ''}</Markdown>
      </div>
    </div>
  )
}

export default LevelStageSummary
