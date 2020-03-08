import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'
import Card from '../../components/Card'

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: window.innerHeight,
  },
  header: {
    flex: 1,
    display: 'flex' as 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'center' as 'center',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 1rem',
  },
  title: {
    fontSize: '4rem',
  },
  subtitle: {
    fontSize: '1.6rem',
  },
  options: {
    flex: 1,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'flex-start' as 'flex-start',
    alignItems: 'center' as 'center',
  },
  buttonContainer: {
    margin: '1rem',
  },
}

interface Props {
  onContinue(): void
  onNew(): void
  tutorial?: G.Tutorial
}

export const LaunchPage = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.header}>
      <h1 css={styles.title}>CodeRoad</h1>
      <h3 css={styles.subtitle}>Play Interactive Coding Tutorials in VSCode</h3>
    </div>

    <div css={styles.options}>
      <div css={styles.buttonContainer}>
        <Button size="large" type="primary" onClick={props.onNew} style={{ width: '8rem' }}>
          Start
        </Button>
      </div>
      {props.tutorial && (
        <div css={styles.buttonContainer}>
          <Button size="large" onClick={props.onContinue} style={{ width: '8rem' }}>
            Continue
          </Button>
        </div>
      )}
    </div>
  </div>
)

interface ContainerProps {
  context: CR.MachineContext
  send(action: CR.Action | string): void
}

const LaunchPageContainer = ({ context, send }: ContainerProps) => {
  const { tutorial } = context
  return (
    <LaunchPage onContinue={() => send('TUTORIAL_START')} onNew={() => send('TUTORIAL_SELECT')} tutorial={tutorial} />
  )
}

export default LaunchPageContainer
