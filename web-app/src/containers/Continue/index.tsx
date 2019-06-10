import * as React from 'react'
import { send } from '../../utils/vscode'
import DataContext from '../../utils/DataContext'
import { Button, Card } from '@alifd/next'

interface Props {
  onContinue(): void
}

export const ContinuePage = (props: Props) => {
  // context
  const { data } = React.useContext(DataContext)
  return (
    <div>
      <h3>Continue</h3>
      <Card showTitleBullet={false} contentHeight="auto">
        <div>
          <h2>{data.summary.title}</h2>
          <p>{data.summary.description}</p>
          <Button onClick={props.onContinue}>Resume</Button>
        </div>
      </Card>
    </div>
  )
}

export default () => (
  <ContinuePage
    onContinue={() => {
      send('TUTORIAL_START')
    }}
  />
)
