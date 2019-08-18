import * as React from 'react'
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
  text?: string | null
  hide: boolean
}

const StepDescription = ({ text, hide }: Props) => {
  if (hide) {
    return null
  }
  return (
    <div style={styles.card}>
      <Markdown>{text || ''}</Markdown>
    </div>
  )
}

export default StepDescription
