import * as React from 'react'
import { send } from '../../utils/vscode'

import Router from '../../components/Router'
import LoadingPage from '../LoadingPage'
import SummaryPage from './SummaryPage'
import LevelPage from './LevelPage'
import StagePage from './StagePage'

const { Route } = Router

interface Props {
  state: any
}

const Tutorial = (props: Props) => {
  return (
    <Router state={props.state}>
      <Route path="Tutorial.LoadNext">
        <LoadingPage text="Loading Tutorial..." />
      </Route>
      <Route path="Tutorial.Summary">
        <SummaryPage state={props.state} send={send} />
      </Route>
      <Route path="Tutorial.Level">
        <LevelPage state={props.state} send={send} />
      </Route>
      <Route path="Tutorial.Stage">
        <StagePage state={props.state} send={send} />
      </Route>
    </Router>
  )
}

export default Tutorial
