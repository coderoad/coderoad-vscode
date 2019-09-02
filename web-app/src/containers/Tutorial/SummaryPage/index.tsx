import * as React from 'react'
import * as CR from 'typings'
import { useQuery } from '@apollo/react-hooks'

import querySummary from './querySummary'
import Summary from './Summary'
import ErrorView from '../../../components/Error'

interface PageProps {
	context: CR.MachineContext
	send(action: CR.Action): void
}

const SummaryPage = (props: PageProps) => {
	const { tutorial } = props.context
  const { loading, error, data } = useQuery(querySummary, {
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

  const onNext = () => props.send({
		type: 'LOAD_TUTORIAL',
		payload: {
			tutorial: data.tutorial,
		}
	})

	const { title, text } = data.tutorial

  return <Summary title={title} text={text} onNext={onNext} />
}

export default SummaryPage
