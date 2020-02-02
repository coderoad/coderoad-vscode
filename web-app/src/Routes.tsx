import * as React from 'react'
import useRouter from './components/Router'
import Workspace from './components/Workspace'
import ContinuePage from './containers/Continue'
import LoadingPage from './containers/LoadingPage'
import NewPage from './containers/New'
import OverviewPage from './containers/Overview'
import CompletedPage from './containers/Tutorial/CompletedPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'

const Routes = () => {
  const { context, send, Router, Route } = useRouter()
  return (
    <Workspace>
      <Router>
        {/* Start */}
        <Route path={['Start.Startup', 'Start.Authenticate', 'Start.NewOrContinue']}>
          <LoadingPage text="Launching..." context={context} />
        </Route>
        <Route path="Start.ContinueTutorial">
          <ContinuePage send={send} context={context} />
        </Route>
        <Route path={['Start.LoadTutorialSummary', 'Start.LoadTutorialData', 'Start.SetupNewTutorial']}>
          <LoadingPage text="Loading Tutorial..." context={context} />
        </Route>
        <Route path="Start.Error">
          <LoadingPage text="Error" context={context} />
        </Route>
        <Route path="Start.SelectTutorial">
          <NewPage send={send} context={context} />
        </Route>
        <Route path="Start.Summary">
          <OverviewPage send={send} context={context} />
        </Route>
        <Route path="Start.SetupNewTutorial">
          <LoadingPage text="Configuring tutorial..." context={context} />
        </Route>
        {/* Tutorial */}
        <Route path={['Tutorial.LoadNext', 'Tutorial.Level.Load']}>
          <LoadingPage text="Loading Level..." context={context} />
        </Route>
        <Route path="Tutorial.Level">
          <LevelSummaryPage send={send} context={context} />
        </Route>
        {/* Completed */}
        <Route path="Tutorial.Completed">
          <CompletedPage send={send} context={context} />
        </Route>
      </Router>
    </Workspace>
  )
}

export default Routes
