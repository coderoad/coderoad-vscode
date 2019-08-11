import * as React from 'react'
import { Button } from '@alifd/next'

interface Props {
  onGitHubLogin(e: any): void
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: window.innerHeight - 20,
  },
}

export const LoginPage = (props: Props) => (
  <div style={styles.page}>
    <div>Login</div>
    <Button onClick={props.onGitHubLogin}>Sign in With GitHub</Button>
  </div>
)

export default () => (
  <LoginPage
    onGitHubLogin={(e: any) => {
      const { value } = e.target
      console.log('value', value)
    }}
  />
)
