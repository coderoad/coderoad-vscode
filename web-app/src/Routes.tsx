import * as React from 'react'
import { MachineContext as RootMachineContext } from './services/state/machine'
import { MachineContext as SelectTutorialContext } from './services/state/selectTutorial'
import { MachineContext as PlayTutorialContext } from './services/state/playTutorial'
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
        <Route path={'Initializing'}>
          <LoadingPage text="Launching..." context={{} as RootMachineContext} />
        </Route>
        <Route path="Start.SelectTutorial">
          <NewPage send={tempSend} context={{} as SelectTutorialContext} />
        </Route>
        <Route path="Start.ContinueTutorial">
          <ContinuePage send={tempSend} context={{} as SelectTutorialContext} />
        </Route>
        <Route path="Start.Initialize">
          <LoadingPage text="Initializing..." context={{} as SelectTutorialContext} />
        </Route>
        <Route path="PlayTutorial.LoadNext">
          <LoadingPage text="Loading..." context={{} as PlayTutorialContext} />
        </Route>
        <Route path="PlayTutorial.Summary">
          <OverviewPage send={tempSend} context={{} as PlayTutorialContext} />
        </Route>
        <Route path="PlayTutorial.Level">
          <LevelSummaryPage send={tempSend} context={{} as PlayTutorialContext} />
        </Route>
        <Route path="PlayTutorial.Completed">
          <CompletedPage send={tempSend} context={{} as PlayTutorialContext} />
        </Route>
      </Router>
    </Workspace>
  )
}

export default Routes
