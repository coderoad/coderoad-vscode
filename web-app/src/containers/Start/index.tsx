import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import BetaBadge from '../../components/BetaBadge'
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
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '0.5rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold' as 'bold',
  },
  subtitle: {
    fontSize: '1.3rem',
  },
  options: {
    flex: 1,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'flex-start' as 'flex-start',
    alignItems: 'center' as 'center',
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
      <BetaBadge>
        <span css={styles.title}>CodeRoad</span>
      </BetaBadge>
      <h3 css={styles.subtitle}>Play Interactive Coding Tutorials in VSCode</h3>
      <p>Learn by coding in a real environment.</p>
      <p>Instant feedback on save.</p>
      <p>Progress saves to Git.</p>
      <p>Build your portfolio as you learn.</p>
    </div>

    <div css={styles.options}>
      <div css={styles.buttonContainer}>
        <Button size="large" type="primary" onClick={props.onNew} style={{ padding: '0 2.5rem' }}>
          Start New Tutorial
        </Button>
      </div>
      {props.tutorial && (
        <div css={styles.buttonContainer}>
          <Button size="large" onClick={props.onContinue} style={{ padding: '0 1rem' }}>
            Continue Current Tutorial
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
