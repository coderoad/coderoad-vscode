import * as React from 'react'
import Markdown from '../Markdown'
import { Checkbox } from '@alifd/next'
// import CC from '../../typings/client'
import CR from 'typings'

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    margin: '1rem',
  },
  left: {
    width: '2rem',
  },
  right: {
    flex: 1,
  },
  active: {
    backgroundColor: 'yellow',
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
