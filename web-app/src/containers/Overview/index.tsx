import * as React from 'react'
import * as G from 'typings/graphql'
import * as CR from 'typings'
import { useQuery } from '@apollo/react-hooks'

import queryTutorial from '../../services/apollo/queries/tutorial'
import OverviewPage from './OverviewPage'
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

const Overview = (props: PageProps) => {
	const { tutorial } = props.context

	if (!tutorial) {
		throw new Error('Tutorial not found in summary page')
	}
	const { loading, error, data } = useQuery<TutorialData, TutorialDataVariables>(queryTutorial, {
		fetchPolicy: 'network-only', // to ensure latest
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
	const { levels } = data.tutorial.version.data

	return <OverviewPage title={title} description={description} levels={levels} onNext={onNext} />
}

export default Overview
