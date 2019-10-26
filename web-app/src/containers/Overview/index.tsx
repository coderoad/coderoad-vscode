import * as React from 'react'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import { useQuery } from '@apollo/react-hooks'

import queryTutorial from '../../services/apollo/queries/tutorial'
import Summary from './Summary'
import ErrorView from '../../components/Error'

interface PageProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

interface TutorialData {
  tutorial: G.Tutorial
}

interface TutorialDataVariables {
  tutorialId: string
  version: string
}

const SummaryPage = (props: PageProps) => {
  const { tutorial } = props.context

  if (!tutorial) {
    throw new Error('Tutorial not found in summary page')
  }
  const { loading, error, data } = useQuery<TutorialData, TutorialDataVariables>(queryTutorial, {
    fetchPolicy: 'network-only', // for debugging purposes
    variables: {
      tutorialId: tutorial.id,
      version: tutorial.version.version,
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

  const { title, description } = data.tutorial.version.summary

  return <Summary title={title} description={description} onNext={onNext} />
}

export default SummaryPage
