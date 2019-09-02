import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as T from 'typings/graphql'
import * as CR from 'typings'

import queryTutorials from './queryTutorials'
import LoadingPage from '../LoadingPage'
import ErrorView from '../../components/Error'
import TutorialList from './TutorialList'

interface Props {
  tutorialList: T.Tutorial[]
}

export const NewPage = (props: Props) => (
  <div>
    <h2>Start a New Tutorial</h2>
    <TutorialList tutorialList={props.tutorialList} />
  </div>
)

const Loading = () => <LoadingPage text="Loading tutorials" />

interface ContainerProps {
	send(action: CR.Action): void
}

const NewPageContainer = (props: ContainerProps) => {
  const { data, loading, error } = useQuery(queryTutorials)
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorView error={error} />
	}

  return (
    <React.Suspense fallback={Loading}>
    	<NewPage tutorialList={data.tutorials} />
    </React.Suspense>
  )
}

export default NewPageContainer
