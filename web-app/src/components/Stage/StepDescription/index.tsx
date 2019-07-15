import * as React from 'react'
import CR from 'typings'
import Markdown from '../../Markdown'

const styles = {
  // active: {
  //   backgroundColor: '#e6f7ff',
  // },
  card: {
    paddingRight: '1rem',
  },
}

interface Props {
  content: CR.TutorialStepContent
  status: any // CC.StageStepStatus
}

const StepDescription = ({ content, status }: Props) => {
  const hidden = !status.active && !status.complete
  if (hidden) {
    return null
  }
  return (
    <div style={styles.card}>
      <Markdown>{content.text}</Markdown>
    </div>
  )
}

export default StepDescription
