import * as React from 'react'
import * as CR from 'typings'
import Workspace from './components/Workspace'

import Router from './components/Router'
import LoadingPage from './containers/LoadingPage'
import ContinuePage from './containers/Continue'
import NewPage from './containers/New'
import SummaryPage from './containers/Tutorial/SummaryPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'
import CompletedPage from './containers/Tutorial/CompletedPage'

const { Route } = Router

const tempSend = (action: any) => console.log('sent')

const Routes = () => {
  return (
    <Workspace>
      <Router>
        <Route path={['Start.Startup', 'Start.Authenticate', 'Start.NewOrContinue']}>
          <LoadingPage text="Launching..." />
        </Route>
        <Route path="Start.SelectTutorial">
          <NewPage send={tempSend} />
        </Route>
        <Route path="Start.ContinueTutorial">
          <ContinuePage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
        <Route path="Tutorial.Initialize">
          <LoadingPage text="Initializing..." />
        </Route>
        <Route path="Tutorial.LoadNext">
          <LoadingPage text="Loading..." />
        </Route>
        <Route path="Tutorial.Summary">
          <SummaryPage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
        <Route path="Tutorial.Level">
          <LevelSummaryPage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
        <Route path="Tutorial.Completed">
          <CompletedPage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
      </Router>
    </Workspace>
  )
}

export default Routes
