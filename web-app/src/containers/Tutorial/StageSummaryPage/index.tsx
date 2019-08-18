import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as T from 'typings/graphql'

import Stage from 'components/Stage'
import ErrorView from 'components/Error'
import queryStage from './queryStage'

interface PageProps {
  stage: T.Stage
  send(action: string): void
}

export const StageSummaryPage = ({ stage, send }: PageProps) => {
  if (!stage) {
    // may throw if no stage is supplied on restart
    throw new Error('No stage provided')
  }

  const stageComplete = stage.status === 'COMPLETE'

  const onContinue = (): void => {
    send('STAGE_NEXT')
  }

  return <Stage stage={stage} onContinue={onContinue} complete={stageComplete} />
}

const StageSummaryPageContainer = props => {
  const { loading, error, data } = useQuery(queryStage, {
    variables: {
      tutorialId: '1',
      version: '1.0.0',
      stageId: '1',
    },
  })
  if (loading) {
    return <div>Loading Levels...</div>
  }

  if (error) {
    return <ErrorView error={error} />
  }

  const { stage } = data.tutorial.version

  return <StageSummaryPage stage={stage} send={props.send} />
}

export default StageSummaryPageContainer
