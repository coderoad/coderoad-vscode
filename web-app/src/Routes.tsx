import * as React from 'react'
import useRouter from './components/Router'
import Workspace from './components/Workspace'
import LoadingPage from './containers/Loading'
import StartPage from './containers/Start'
import SelectTutorialPage from './containers/SelectTutorial'
import OverviewPage from './containers/Overview'
import CompletedPage from './containers/Tutorial/CompletedPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'

const Routes = () => {
  const { context, send, Router, Route } = useRouter()
  return (
    <Workspace>
      <Router>
        {/* Setup */}
        <Route
          path={[
            'Setup.Startup',
            'Setup.Authenticate',
            'Setup.LoadStoredTutorial',
            'Setup.CheckEmptyWorkspace',
            'Setup.RequestEmptyWorkspace',
          ]}
        >
          <LoadingPage text="Launching..." context={context} />
        </Route>
        <Route path="Setup.Start">
          <StartPage send={send} context={context} />
        </Route>
        <Route path={['Setup.LoadTutorialSummary', 'Setup.LoadTutorialData', 'Setup.SetupNewTutorial']}>
          <LoadingPage text="Loading Tutorial..." context={context} />
        </Route>
        <Route path="Setup.Error">
          <LoadingPage text="Error" context={context} />
        </Route>
        <Route path="Setup.SelectTutorial">
          <SelectTutorialPage send={send} context={context} />
        </Route>
        <Route path="Setup.Summary">
          <OverviewPage send={send} context={context} />
        </Route>
        <Route path="Setup.SetupNewTutorial">
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
