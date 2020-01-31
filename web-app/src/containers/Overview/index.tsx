import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import ErrorView from '../../components/Error'
import queryTutorial from '../../services/apollo/queries/tutorial'
import OverviewPage from './OverviewPage'

interface PageProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  // version: string
}

const Overview = (props: PageProps) => {
  const { tutorial } = props.context

  if (!tutorial) {
    throw new Error('Tutorial not found in summary page')
  }
  const { loading, error, data } = useQuery<TutorialData, TutorialDataVariables>(queryTutorial, {
    fetchPolicy: 'network-only', // to ensure latest
    variables: {
      tutorialId: tutorial.id,
      // version: tutorial.version.version, // TODO: re-enable latest
    },
  })

  if (loading) {
    return <div>Loading Summary...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

  if (!data) {
    return null
  }

  const onNext = () =>
    props.send({
      type: 'LOAD_TUTORIAL',
      payload: {
        tutorial: data.tutorial,
      },
    })

  const onBack = () => props.send({ type: 'BACK' })

  const { title, description } = data.tutorial.summary
  const { levels } = data.tutorial.version.data

  return <OverviewPage title={title} description={description} levels={levels} onNext={onNext} onBack={onBack} />
}

export default Overview
