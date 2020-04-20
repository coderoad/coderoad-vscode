import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { css, jsx } from '@emotion/core'
import { Dropdown } from '@alifd/next'
import Icon from '../../../components/Icon'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import ProcessMessages from '../../../components/ProcessMessages'
import NuxTutorial from '../../../components/NewUserExperience/NuxTutorial'
import Step from './Step'

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
  header: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
  },
  learn: {
    textDecoration: 'none',
    color: 'inherit',
  },
  text: {
    padding: '0rem 1rem',
    paddingBottom: '1rem',
  },
  tasks: {},
  steps: {
    padding: '1rem 1rem',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold' as 'bold',
    lineHeight: '1.2rem',
  },
  processes: {
    padding: '0 1rem',
    position: 'fixed' as 'fixed',
    bottom: '4rem',
    left: 0,
    right: 0,
  },
  nux: {
    position: 'fixed' as 'fixed',
    bottom: '2rem',
    left: 0,
    right: 0,
  },
  footer: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '2rem',
    backgroundColor: 'black',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    color: 'white',
  },
  taskCount: {
    fontSize: '0.8rem',
    opacity: 0.9,
  },
}

interface Props {
  menu: any
  steps: Array<TT.Step & { status: T.ProgressStatus }>
  title: string
  index: number
  content: string
  status: 'COMPLETE' | 'ACTIVE' | 'INCOMPLETE'
  processes: T.ProcessEvent[]
  testStatus: T.TestStatus | null
  onContinue(): void
  onLoadSolution(): void
}

const Level = ({
  menu,
  steps,
  title,
  content,
  index,
  status,
  onContinue,
  onLoadSolution,
  processes,
  testStatus,
}: Props) => {
  // @ts-ignore
  let currentStep = steps.findIndex((s) => s.status === 'ACTIVE')
  if (currentStep === -1) {
    currentStep = steps.length
  }

  const pageBottomRef = React.useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    pageBottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  React.useEffect(scrollToBottom, [currentStep])

  return (
    <div css={styles.page}>
      <div css={styles.content}>
        <div css={styles.header}>
          <Dropdown
            trigger={
              <a css={styles.learn}>
                Learn <Icon type="arrow-down" size="xxs" />
              </a>
            }
            triggerType="click"
          >
            {menu}
          </Dropdown>
        </div>
        <div css={styles.text}>
          <h2 css={styles.title}>{title}</h2>
          <Markdown>{content || ''}</Markdown>
        </div>

        {steps.length ? (
          <div css={styles.tasks}>
            <div css={styles.header}>Tasks</div>
            <div css={styles.steps}>
              {steps.map((step: (TT.Step & { status: T.ProgressStatus }) | null, index: number) => {
                if (!step) {
                  return null
                }
                return (
                  <Step
                    key={step.id}
                    order={index + 1}
                    status={step.status}
                    content={step.content}
                    onLoadSolution={onLoadSolution}
                  />
                )
              })}
            </div>
          </div>
        ) : null}

        <div ref={pageBottomRef} />

        {(testStatus || processes.length > 0) && (
          <div css={styles.processes}>
            <ProcessMessages processes={processes} testStatus={testStatus} />
          </div>
        )}

        <div css={styles.nux}>
          <NuxTutorial onLoadSolution={onLoadSolution} />
        </div>

        <div css={styles.footer}>
          <span>
            {typeof index === 'number' ? `${index + 1}. ` : ''}
            {title}
          </span>
          <span>
            {status === 'COMPLETE' || !steps.length ? (
              <Button type="primary" onClick={onContinue}>
                Continue
              </Button>
            ) : (
              <span css={styles.taskCount}>
                {currentStep} of {steps.length} tasks
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Level
