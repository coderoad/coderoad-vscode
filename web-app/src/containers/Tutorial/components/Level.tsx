import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
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

interface Props {
  level: TT.Level
}

const Level = ({ level }: Props) => {
  // hold state for hints for the level
  const [displayHintsIndex, setDisplayHintsIndex] = React.useState<number[]>([])
  const setHintsIndex = (index: number, value: number) => {
    return setDisplayHintsIndex((displayHintsIndex) => {
      const next = [...displayHintsIndex]
      next[index] = value
      return next
    })
  }
  React.useEffect(() => {
    // set the hints to empty on level starts
    setDisplayHintsIndex(level.steps.map((s: TT.Step) => -1))
  }, [level.id])

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

        <Steps steps={level.steps} setHintsIndex={setHintsIndex} displayHintsIndex={displayHintsIndex} />

        <div ref={pageBottomRef} />
      </div>
    </div>
  )
}

export default Level
