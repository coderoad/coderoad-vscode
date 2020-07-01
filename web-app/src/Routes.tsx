import * as React from 'react'
import useStateMachine from './services/state/useStateMachine'
import { Router, Route } from './components/Router'
import ErrorView from './components/Error'
import LoadingPage from './containers/Loading'
import StartPage from './containers/Start'
import SelectTutorialPage from './containers/SelectTutorial'
import CompletedPage from './containers/Tutorial/CompletedPage'
import TutorialPage from './containers/Tutorial'

const Routes = () => {
  const { context, route, send } = useStateMachine()

  // TODO: handle only full page errors
  if (context.error) {
    return <ErrorView send={send} error={context.error} />
  }

  return (
    <Router route={route}>
      {/* Setup */}
      <Route paths={{ Setup: { Startup: true, ValidateSetup: true } }}>
        <LoadingPage text="Launching..." processes={context.processes} />
      </Route>
      <Route paths={{ Setup: { Start: true } }}>
        <StartPage send={send} context={context} />
      </Route>
      <Route paths={{ Setup: { SelectTutorial: true } }}>
        <SelectTutorialPage send={send} context={context} />
      </Route>
      <Route paths={{ Setup: { SetupNewTutorial: true, StartTutorial: true } }}>
        <LoadingPage text="Configuring tutorial..." />
      </Route>
      {/* Tutorial */}
      <Route paths={{ Tutorial: { Level: { Load: true } } }}>
        <LoadingPage text="Loading Level..." processes={context.processes} />
      </Route>
      <Route paths={{ Tutorial: { LoadNext: true, Level: true } }}>
        <TutorialPage send={send} context={context} />
      </Route>
      {/* Completed */}
      <Route paths={{ Tutorial: { Completed: true } }}>
        <CompletedPage context={context} />
      </Route>
    </Router>
  )
}

export default Routes
