import * as React from 'react'
import * as CR from 'typings'
import Router from './components/Router'
import Workspace from './components/Workspace'
import ContinuePage from './containers/Continue'
import LoadingPage from './containers/LoadingPage'
import NewPage from './containers/New'
import OverviewPage from './containers/Overview'
import CompletedPage from './containers/Tutorial/CompletedPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'

const { Route } = Router

const tempSend = (action: any) => console.log('sent')

const Routes = () => {
  // TODO refactor for typescript to understand send & context passed into React.cloneElement's
  return (
    <Workspace>
      <Router>
        <Route path={['SelectTutorial.Startup', 'SelectTutorial.Authenticate', 'SelectTutorial.NewOrContinue']}>
          <LoadingPage text="Launching..." context={{} as CR.MachineContext} />
        </Route>
        <Route path="SelectTutorial.SelectTutorial">
          <NewPage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
        <Route path="SelectTutorial.ContinueTutorial">
          <ContinuePage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
        <Route path="PlayTutorial.Initialize">
          <LoadingPage text="Initializing..." context={{} as CR.MachineContext} />
        </Route>
        <Route path="PlayTutorial.LoadNext">
          <LoadingPage text="Loading..." context={{} as CR.MachineContext} />
        </Route>
        <Route path="PlayTutorial.Summary">
          <OverviewPage send={tempSend} context={{} as CR.MachineContext} />
        </Route>
        <Route path="PlayTutorial.Level">
          <LevelSummaryPage send={tempSend} context={{} as CR.PlayMachineContext} />
        </Route>
        <Route path="PlayTutorial.Completed">
          <CompletedPage send={tempSend} context={{} as CR.PlayMachineContext} />
        </Route>
      </Router>
    </Workspace>
  )
}

export default Routes
