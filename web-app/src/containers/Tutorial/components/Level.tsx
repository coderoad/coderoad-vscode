import * as React from 'react'
import * as T from 'typings'
import { css, jsx } from '@emotion/core'
import Content from './Content'
import Steps from './Steps'

const styles = {
  page: {
    backgroundColor: 'white',
    position: 'relative' as 'relative',
    height: 'auto',
    width: '100%',
  },
  content: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    padding: 0,
    paddingBottom: '5rem',
  },

  text: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
  },
  separator: {
    height: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },

  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    lineHeight: '1.2rem',
  },
}

type Props = {
  level: T.LevelUI
}

const Level = ({ level }: Props) => {
  const pageBottomRef = React.useRef(null)
  const scrollToBottom = () => {
    // @ts-ignore
    pageBottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  React.useEffect(scrollToBottom, [level.id])

  return (
    <div css={styles.page}>
      <div css={styles.content}>
        <Content title={level.title} content={level.content} />

        {level.content.length && level.steps.length ? <div css={styles.separator} /> : null}

        <Steps steps={level.steps} />

        <div ref={pageBottomRef} />
      </div>
    </div>
  )
}

export default Level
