import * as React from 'react'
import { send } from 'utils/vscode'

import Router from 'components/Router'
import LoadingPage from '../LoadingPage'
import SummaryPage from './SummaryPage'
import LevelSummaryPage from './LevelPage'
import StageSummaryPage from './StagePage'
import CompletedPage from './CompletedPage'

const { Route } = Router

interface Props {
  state: any
}

const Tutorial = (props: Props) => {
  return (
    <Router state={props.state}>
      <Route path="Tutorial.LoadNext">
        <LoadingPage text="Loading..." />
      </Route>
      <Route path="Tutorial.Summary">
        <SummaryPage send={send} />
      </Route>
      <Route path="Tutorial.Level">
        <LevelSummaryPage send={send} />
      </Route>
      <Route path="Tutorial.Stage">
        <StageSummaryPage send={send} />
      </Route>
      <Route path="Tutorial.Completed">
        <CompletedPage />
      </Route>
    </Router>
  )
}

export default Tutorial
