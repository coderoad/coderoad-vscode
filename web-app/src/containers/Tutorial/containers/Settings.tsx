import React from 'react'
import { Card } from '@alifd/next'
import { Theme } from '../../../styles/theme'
import Reset from '../components/Reset'

const styles = {
  flexColumn: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
  container: (theme: Theme) => ({
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: theme['$color-white'],
    height: 'auto',
  }),
  header: (theme: Theme) => ({
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '2rem',
    backgroundColor: theme['$color-fill1-2'],
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 0.4rem 10px 1rem',
    marginBottom: '0.5rem',
  }),
  content: {
    padding: '0.5rem',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    gap: '1rem',
  },
}

interface Props {
  onReset(): void
}

const SettingsPage = (props: Props) => {
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <div>Settings</div>
      </div>
      <div css={styles.content}>
        <Card free>
          <Card.Header title="About" />
          <Card.Divider />
          <Card.Content>
            <div>
              CodeRoad is an open source VSCode extension that allows you to <strong>create</strong> and{' '}
              <strong>play</strong> interactive coding tutorials inside VSCode.
            </div>
          </Card.Content>
          <Card.Divider />
          <Card.Actions>
            <a href="https://github.com/coderoad/coderoad-vscode">GitHub</a>
            <a href="mailto:coderoadapp@gmail.com" style={{ marginLeft: '0.5rem' }}>
              Email
            </a>
          </Card.Actions>
        </Card>
        <Card free>
          <Card.Header title="Reset Tutorial" />
          <Card.Divider />
          <Card.Content>
            This will reset the whole tutorial and change the source files back to the first level and first task
            checkpoint. This will reset the whole tutorial and change the source files back to the first level and first
            task checkpoint. This will reset the whole tutorial and change the source files back to the first level and
            first task checkpoint.
          </Card.Content>
          <Card.Divider />
          <Card.Actions>
            <Reset warning onReset={props.onReset} />
          </Card.Actions>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
