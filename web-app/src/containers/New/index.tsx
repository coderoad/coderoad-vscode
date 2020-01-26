import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import * as G from 'typings/graphql'
import { MachineContext, MachineEvent } from '../../services/state/selectTutorial'
import ErrorView from '../../components/Error'
import queryTutorials from '../../services/apollo/queries/tutorials'
import LoadingPage from '../LoadingPage'
import NewPage from './NewPage'

interface ContainerProps {
  send(action: MachineEvent): void
  context: MachineContext
}

interface TutorialsData {
  tutorials: G.Tutorial[]
}

const NewPageContainer = (props: ContainerProps) => {
  const { data, loading, error } = useQuery<TutorialsData>(queryTutorials)

  if (error) {
    return <ErrorView error={error} />
  }

  if (loading) {
    return <LoadingPage text="Loading tutorials" context={props.context} />
  }

  if (!data) {
    return null
  }

  return <NewPage tutorialList={data.tutorials} />
}

export default NewPageContainer
