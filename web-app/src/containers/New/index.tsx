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
  onNew(action: CR.Action): void
}

export const NewPage = (props: Props) => (
  <div>
    <h2>Start a New Tutorial</h2>
    <TutorialList tutorialList={props.tutorialList} onNew={props.onNew} />
  </div>
)

const Loading = () => <LoadingPage text="Loading tutorials" />

interface ContainerProps {
	send?(action: CR.Action): void
}

const NewPageContainer = (props: ContainerProps) => {
	console.log('props', props)
  const { data, loading, error } = useQuery(queryTutorials)
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorView error={error} />
	}
	
	// TODO: cleanup React.cloneElement props issue
	const sendFallback = (action: CR.Action) => console.log('Cannot send')
	const send = props.send || sendFallback

  return (
    <React.Suspense fallback={Loading}>
    	<NewPage onNew={send} tutorialList={data.tutorials} />
    </React.Suspense>
  )
}

export default NewPageContainer
