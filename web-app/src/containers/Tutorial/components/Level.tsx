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
  currentStep: number
  status: 'COMPLETE' | 'ACTIVE' | 'INCOMPLETE'
  progress: T.Progress
  position: T.Position
  processes: T.ProcessEvent[]
  testStatus: T.TestStatus | null
}

const Level = ({ level, progress, position, currentStep, testStatus }: Props) => {
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
  }, [position.levelId])

  const steps: TT.Step[] = level.steps.map((step: TT.Step) => {
    // label step status for step component
    let status: T.ProgressStatus = 'INCOMPLETE'
    if (progress.steps[step.id]) {
      status = 'COMPLETE'
    } else if (step.id === position.stepId) {
      status = 'ACTIVE'
    }
    return { ...step, status }
  })

  // current

  const pageBottomRef = React.useRef(null)
  const scrollToBottom = () => {
    // @ts-ignore
    pageBottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  React.useEffect(scrollToBottom, [currentStep])

  return (
    <div css={styles.page}>
      <div css={styles.content}>
        <Content title={level.title} content={level.content} />

        {level.content.length && steps.length ? <div css={styles.separator} /> : null}

        <Steps
          steps={steps}
          testStatus={testStatus}
          setHintsIndex={setHintsIndex}
          displayHintsIndex={displayHintsIndex}
        />

        <div ref={pageBottomRef} />
      </div>
    </div>
  )
}

export default Level
