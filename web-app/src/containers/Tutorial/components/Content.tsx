import * as React from 'react'
import Markdown from '../../../components/Markdown'

const styles = {
  text: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
    width: '100%',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    lineHeight: '1.2rem',
  },
}

interface Props {
  title: string
  content: string
}

const Content = (props: Props) => {
  if (!props.content.length) {
    return null
  }
  return (
    <div css={styles.text}>
      <h2 css={styles.title}>{props.title}</h2>
      <Markdown>{props.content || ''}</Markdown>
    </div>
  )
}

export default Content
