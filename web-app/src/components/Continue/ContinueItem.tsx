import * as React from 'react'
import Button from '@alifd/next/lib/button'
import '@alifd/next/lib/button/style'
import '@alifd/next/lib/button/style'
import Card from '@alifd/next/lib/card'

interface Props {
  title: string
  description: string
  onContinue(): void
}

const ContinueItem = (props: Props) => {
  return (
    <Card showTitleBullet={false} contentHeight="auto">
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <Button onClick={props.onContinue}>Resume</Button>
      </div>
    </Card>
  )
}

export default ContinueItem
