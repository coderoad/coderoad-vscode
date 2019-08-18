import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import ErrorView from 'components/Error'
import Stage from './Stage'
import queryStage from './queryStage'

interface PageProps {
  send(action: string): void
}

const StageSummaryPageContainer = (props: PageProps) => {
  const { loading, error, data } = useQuery(queryStage, {
    variables: {
      tutorialId: '1',
      version: '0.1.0',
      stageId: '1',
    },
  })
  if (loading) {
    return <div>Loading Stage...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

  console.log('data', data)

  const { stage } = data.tutorial.version

  const onContinue = (): void => {
    props.send('STAGE_NEXT')
  }

  return <Stage stage={stage} onContinue={onContinue} />
}

export default StageSummaryPageContainer
