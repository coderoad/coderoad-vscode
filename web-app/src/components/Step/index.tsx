import { Checkbox } from '@alifd/next'
import * as React from 'react'
// import CC from '../../typings/client'
import CR from 'typings'
import Markdown from '../Markdown'

const styles = {
  active: {
    backgroundColor: '#e6f7ff',
  },
  card: {
    borderRadius: '0.3rem',
    display: 'grid',
    gridTemplateAreas: 'CheckboxMargin Content',
    gridTemplateColumns: '2rem 1fr',
    gridTemplateRows: '1fr',
    margin: '1rem',
  },
  left: {
    justifySelf: 'center',
    paddingTop: '0.8rem',
  },
  right: {
    padding: '0.2rem',
    paddingTop: 0,
  },
}

interface Props {
  content: CR.TutorialStepContent
  status: any // CC.StageStepStatus
}

const Step = ({ content, status }: Props) => {
  const hidden = !status.active && !status.complete
  if (hidden) {
    return null
  }
  const cardStyles = { ...styles.card, ...(status.active ? styles.active : {}) }
  return (
    <div style={cardStyles}>
      <div style={styles.left}>
        <Checkbox checked={status.complete} />
      </div>
      <div style={styles.right}>
        <Markdown>{content.text}</Markdown>
      </div>
    </div>
  )
}

export default Step
