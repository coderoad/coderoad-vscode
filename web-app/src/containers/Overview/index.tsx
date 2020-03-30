import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import * as CR from 'typings'
import * as TT from 'typings/tutorial'
import ErrorView from '../../components/Error'
import OverviewPage from './OverviewPage'
import LoadingPage from '../Loading'

interface PageProps {
  context: CR.MachineContext
  send(action: CR.Action): void
}

interface TutorialData {
  tutorial: TT.Tutorial
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

  console.log('todo overview load')

  return <div>Overview Page</div>

  // const onNext = () =>
  //   props.send({
  //     type: 'TUTORIAL_START',
  //     payload: {
  //       tutorial: data.tutorial,
  //     },
  //   })

  // const onBack = () => props.send({ type: 'BACK' })

  // const { title, description } = data.tutorial.summary
  // const { createdBy, updatedAt, data: tutorialData } = data.tutorial.version
  // const { levels } = tutorialData

  // return (
  //   <OverviewPage
  //     title={title}
  //     description={description}
  //     createdBy={createdBy}
  //     updatedAt={updatedAt}
  //     levels={levels}
  //     onNext={onNext}
  //     onBack={onBack}
  //   />
  // )
}

export default Overview
