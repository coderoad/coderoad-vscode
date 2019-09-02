import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button, Card } from '@alifd/next'
import * as CR from 'typings'
import * as T from 'typings/graphql'

// import { editorDispatch } from '../../services/vscode'
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

interface ContainerProps {
	context: CR.MachineContext
}

const ContinuePageContainer = ({ context }: ContainerProps) => {
	// TODO: load specific tutorialId
	const { tutorial } = context
	// const { tutorialId, version } = currentTutorial.get()
  const { data, loading, error } = useQuery(queryTutorial, {
    variables: {
      tutorialId: tutorial.id,
      version: tutorial.version.version,
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
        console.log('TUTORIAL_START')
      }}
    />
  )
}

export default ContinuePageContainer
