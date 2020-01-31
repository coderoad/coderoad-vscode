import * as React from 'react'
import * as CR from 'typings'
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
  // TODO refactor for typescript to understand send & context passed into React.cloneElement's
  return (
    <Workspace>
      <Router>
        <Route path={['Start.Startup', 'Start.Authenticate', 'Start.NewOrContinue']}>
          <LoadingPage text="Launching..." context={context} />
        </Route>
        <Route path={'Start.Error'}>
          <div>Something went wrong wrong</div>
        </Route>
        <Route path="Start.SelectTutorial">
          <NewPage send={send} context={context} />
        </Route>
        <Route path="Start.ContinueTutorial">
          <ContinuePage send={send} context={context} />
        </Route>
        <Route path={'Tutorial.Error'}>
          <div>Something went wrong wrong</div>
        </Route>
        <Route path="Tutorial.Initialize">
          <LoadingPage text="Initializing..." context={context} />
        </Route>
        <Route path="Tutorial.LoadNext">
          <LoadingPage text="Loading..." context={context} />
        </Route>
        <Route path="Tutorial.Summary">
          <OverviewPage send={send} context={context} />
        </Route>
        <Route path="Tutorial.Level">
          <LevelSummaryPage send={send} context={context} />
        </Route>
        <Route path="Tutorial.Completed">
          <CompletedPage send={send} context={context} />
        </Route>
      </Router>
    </Workspace>
  )
}

export default Routes
