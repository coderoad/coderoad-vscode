import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import { Badge } from '@alifd/next'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
    height: window.innerHeight,
  },
  header: {
    flex: 1,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'flex-end' as 'flex-end',
    alignItems: 'center' as 'center',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '1rem',
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
    padding: '1rem',
  },
  betaBadge: {
    backgroundColor: '#6a67ce',
    color: '#FFFFFF',
  },
  buttonContainer: {
    margin: '0.5rem',
  },
}

interface Props {
  onContinue(): void
  onNew(): void
  tutorial?: G.Tutorial
}

export const StartPage = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.header}>
      <Badge content="beta" style={styles.betaBadge}>
        <span css={styles.title}>CodeRoad&nbsp;</span>
      </Badge>
      <h3 css={styles.subtitle}>Play Interactive Coding Tutorials in VSCode</h3>
    </div>

    <div css={styles.options}>
      <div css={styles.buttonContainer}>
        <Button size="large" type="primary" onClick={props.onNew} style={{ width: '10rem' }}>
          Start
        </Button>
      </div>
      {props.tutorial && (
        <div css={styles.buttonContainer}>
          <Button size="large" onClick={props.onContinue} style={{ width: '10rem' }}>
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

const StartPageContainer = ({ context, send }: ContainerProps) => {
  const tutorial = context.tutorial || undefined
  return (
    <StartPage onContinue={() => send('CONTINUE_TUTORIAL')} onNew={() => send('NEW_TUTORIAL')} tutorial={tutorial} />
  )
}

export default StartPageContainer
