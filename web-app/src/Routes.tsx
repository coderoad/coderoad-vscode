import * as React from 'react'
import useStateMachine from './services/state/useStateMachine'
import { Router, Route } from './components/Router'
import ErrorView from './components/Error'
import LoadingPage from './containers/Loading'
import StartPage from './containers/Start'
import SelectTutorialPage from './containers/SelectTutorial'
import TutorialPage from './containers/Tutorial'
import logger from './services/logger'

/*
 * NOTE: due to a lack of URLs and a dependency on xstate
 * we have to implement a custom router here
 */
const Routes = () => {
  const { context, route, send } = useStateMachine()

  // TODO: handle only full page errors
  if (context.error) {
    return <ErrorView send={send} error={context.error} />
  }

  logger(
    `ROUTE: "${route}": ${context.position?.complete ? 'Completed' : 'On'} level ${
      context.position?.levelId || 'unknown'
    }, step ${context.position?.stepId || 'unknown'}`,
  )

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
      <Route paths={{ Tutorial: { Reset: true } }}>
        <LoadingPage text="Resetting tutorial..." processes={context.processes} />
      </Route>
      <Route paths={{ Tutorial: { Level: true, Completed: true } }}>
        <TutorialPage send={send} context={context} state={route.replace('Tutorial.', '')} />
      </Route>
    </Router>
  )
}

export default Routes
