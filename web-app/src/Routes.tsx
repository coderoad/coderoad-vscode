import * as React from 'react'
import { send } from './utils/vscode'

import Cond from './components/Cond'
import NewPage from './containers/New'
import ContinuePage from './containers/Continue'


interface Props {
  state: any
}

const Routes = ({ state }: Props) => {
    // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
    return (
      <div>
        <Cond state={state} path="SelectTutorial.NewTutorial">
          <NewPage onNew={() => send('TUTORIAL_START')} />
        </Cond>
        <Cond state={state} path="SelectTutorial.ContinueTutorial">
          <ContinuePage onContinue={() => console.log('continue!')} tutorials={[]} />
        </Cond>
      </div>
    )
}

export default Routes