import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button, Card } from '@alifd/next'
import * as T from 'typings/graphql'

import currentTutorial from '../../services/current'
import { send } from '../../utils/vscode'
import LoadingPage from '../LoadingPage'
import queryTutorial from './queryTutorial'
import ErrorView from '../../components/Error'

interface Props {
  tutorial: T.Tutorial
  onContinue(): void
}

export const ContinuePage = (props: Props) => (
  <div>
    <h3>Continue</h3>
    <Card showTitleBullet={false} contentHeight="auto">
      <div>
        <h2>{props.tutorial.title}</h2>
        <p>{props.tutorial.text}</p>
        <Button onClick={props.onContinue}>Resume</Button>
      </div>
    </Card>
  </div>
)

const Loading = () => <LoadingPage text="Loading tutorials" />

const ContinuePageContainer = () => {
	// TODO: load specific tutorialId
	const { tutorialId, version } = currentTutorial.get()
  const { data, loading, error } = useQuery(queryTutorial, {
    variables: {
      tutorialId,
      version,
    },
  })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorView error={error} />
  }

  return (
    <ContinuePage
      tutorial={data.tutorial}
      onContinue={() => {
        send('TUTORIAL_START')
      }}
    />
  )
}

export default ContinuePageContainer
