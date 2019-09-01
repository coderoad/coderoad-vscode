import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import querySummary from './querySummary'
import Summary from './Summary'
import currentTutorial from '../../../services/current'
import ErrorView from '../../../components/Error'

interface PageProps {
  send(action: string): void
}

const SummaryPage = (props: PageProps) => {
	const { tutorialId } = currentTutorial.get()
  const { loading, error, data } = useQuery(querySummary, {
    variables: {
      tutorialId,
    },
  })

  if (loading) {
    return <div>Loading Summary...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

  const { title, text } = data.tutorial
  const onNext = () => props.send('NEXT')

  return <Summary title={title} text={text} onNext={onNext} />
}

export default SummaryPage
