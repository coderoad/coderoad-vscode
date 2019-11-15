import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as G from 'typings/graphql'
import * as CR from 'typings'

import queryTutorials from '../../services/apollo/queries/tutorials'
import NewPage from './NewPage'
import LoadingPage from '../LoadingPage'
import ErrorView from '../../components/Error'

const Loading = () => <LoadingPage text="Loading tutorials" />

interface ContainerProps {
	send(action: CR.Action): void
}

interface TutorialsData {
	tutorials: G.Tutorial[]
}

const NewPageContainer = (props: ContainerProps) => {
	const { data, loading, error } = useQuery<TutorialsData>(queryTutorials)
	if (loading) {
		return <Loading />
	}

	if (error) {
		return <ErrorView error={error} />
	}

	if (!data) {
		return null
	}

	return (
		<React.Suspense fallback={Loading}>
			<NewPage tutorialList={data.tutorials} />
		</React.Suspense>
	)
}

export default NewPageContainer
