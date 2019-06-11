import * as React from 'react'

import Loading from './components/Loading'
import Cond from './components/Cond'
import NewPage from './containers/New'
import ContinuePage from './containers/Continue'
import TutorialPage from './containers/Tutorial'

interface Props {
  state: any
}

const Routes = ({ state }: Props) => {
  // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
  return (
    <div>
      <Cond state={state} path="SelectTutorial.Startup">
        <Loading />
      </Cond>
      <Cond state={state} path="SelectTutorial.NewTutorial">
        <NewPage />
      </Cond>
      <Cond state={state} path="SelectTutorial.ContinueTutorial">
        <ContinuePage />
      </Cond>
      <Cond state={state} path="Tutorial">
        <TutorialPage state={state} />
      </Cond>
    </div>
  )
}

export default Routes
