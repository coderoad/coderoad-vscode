import * as React from 'react'
import * as CR from 'typings'
import * as TT from 'typings/tutorial'
import { Progress } from '@alifd/next'
import BetaBadge from '../../components/BetaBadge'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'
import { Theme } from '../../styles/theme'
import { ADMIN_MODE } from '../../environment'
import AdminToggle from '../../services/admin/AdminToggle'
import getProgress from './getProgress'

const styles = {
  page: (theme: Theme) => ({
    position: 'relative' as 'relative',
    display: 'grid' as 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    gridTemplateAreas: `
      "." "header" "options" "hidden-options";
    `,
    justifyItems: 'center',
    width: '100%',
    maxWidth: '100%',
    height: '100vh',
    backgroundColor: theme['$color-white'],
  }),
  header: {
    gridArea: 'header',
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
    textAlign: 'center' as 'center',
  },
  options: {
    gridArea: 'options',
    flex: 1,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'flex-start' as 'flex-start',
    alignItems: 'center' as 'center',
  },
  buttonLarge: (theme: Theme) => ({
    padding: '0.2rem 1rem',
    border: `solid 1px ${theme['$color-line1-3']}`,
    borderRadius: '3px',
    minHeight: '2rem',
    fontSize: '16px',
    backgroundColor: 'white',
    lineHeight: '1.5rem',
    color: theme['$color-text1-4'],
    '&:hover,&:focus': css({
      backgroundColor: theme['$color-fill1-1'],
      borderColor: theme['$color-line1-4'],
      outline: 'none',
      boxShadow: 'none',
    }),
  }),
  continueTitle: (theme: Theme) => ({
    color: theme['$color-text1-3'],
    fontSize: '12px',
  }),
  buttonContainer: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    margin: '0.5rem',
  },
  hiddenOptions: (theme: Theme) => ({
    gridArea: 'hidden-options',
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    width: '6rem',
    padding: '0.5rem',
    marginTop: '8rem',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    backgroundColor: theme['$color-fill1-1'],
  }),
}

interface Props {
  onContinue(): void
  onNew(): void
  tutorial: TT.Tutorial | null
  progress: number | null
}

export const StartPage = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.header}>
      <BetaBadge>
        <span css={styles.title}>CodeRoad</span>
      </BetaBadge>
      <h3 css={styles.subtitle}>Play Tutorials in VSCode</h3>
      <p>Learn in a real environment.</p>
      <p>Instant feedback on save.</p>
      <p>Build your portfolio and Git timeline.</p>
    </div>

    <div css={styles.options}>
      <div css={styles.buttonContainer}>
        <Button size="large" type="primary" onClick={props.onNew} style={{ padding: '0 2.5rem' }}>
          Start New Tutorial
        </Button>
      </div>
      {!!props.tutorial && props.progress !== null && (
        <div css={styles.buttonContainer}>
          <button onClick={props.onContinue} css={styles.buttonLarge}>
            Continue Tutorial
            <div css={styles.continueTitle}>"{props.tutorial.summary.title}"</div>
            <Progress style={{ marginLeft: '1rem' }} percent={props.progress || 0} hasBorder size="large" />
          </button>
        </div>
      )}
    </div>
    {ADMIN_MODE ? (
      <div css={styles.hiddenOptions}>
        <AdminToggle />
      </div>
    ) : null}
  </div>
)

interface ContainerProps {
  context: CR.MachineContext
  send(action: CR.Action | string): void
}

const StartPageContainer = ({ context, send }: ContainerProps) => {
  const progress = getProgress(context?.tutorial?.levels, context.position)
  return (
    <StartPage
      onContinue={() => send({ type: 'CONTINUE_TUTORIAL' })}
      onNew={() => send({ type: 'NEW_TUTORIAL' })}
      tutorial={context.tutorial}
      progress={progress}
    />
  )
}

export default StartPageContainer
