import * as React from 'react'
import useRouter from './components/Router'
import Workspace from './components/Workspace'
import LoadingPage from './containers/Loading'
import StartPage from './containers/Start'
import SelectTutorialPage from './containers/SelectTutorial'
import CompletedPage from './containers/Tutorial/CompletedPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'
import SelectEmptyWorkspace from './containers/Check/SelectWorkspace'
import GitInstalled from './containers/Check/GitInstalled'
import GitRemoteFailed from './containers/Check/GitRemoteFailed'

const Routes = () => {
  const { context, send, Router, Route } = useRouter()
  return (
    <Workspace>
      <Router>
        {/* Setup */}
        <Route path={['Setup.Startup', 'Setup.LoadStoredTutorial', 'Setup.ValidateSetup']}>
          <LoadingPage text="Launching..." context={context} />
        </Route>
        <Route path="Setup.Start">
          <StartPage send={send} context={context} />
        </Route>
        <Route path={['Setup.LoadTutorialSummary', 'Setup.LoadTutorialData', 'Setup.SetupNewTutorial']}>
          <LoadingPage text="Loading Tutorial..." context={context} />
        </Route>
        <Route path={['Setup.NonEmptyWorkspace', 'Setup.RequestEmptyWorkspace']}>
          <SelectEmptyWorkspace send={send} />
        </Route>
        <Route path="Setup.GitNotInstalled">
          <GitInstalled send={send} />
        </Route>
        <Route path="Setup.SelectTutorial">
          <SelectTutorialPage send={send} context={context} />
        </Route>
        <Route path={['Setup.SetupNewTutorial', 'Setup.StartNewTutorial']}>
          <LoadingPage text="Configuring tutorial..." context={context} />
        </Route>
        <Route path="Setup.GitRemoteFailed">
          <GitRemoteFailed send={send} error={context.error} />
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
