import * as React from 'react'

import Cond from './components/Cond'
import Loading from './components/Loading'
import ContinuePage from './containers/Continue'
import NewPage from './containers/New'
import TutorialPage from './containers/Tutorial'

interface Props {
  state: any
}

const styles = {
  page: {
    margin: 0,
    width: window.innerWidth - 20, // 220
    height: window.innerHeight - 20, // 655
    backgroundColor: 'white',
  },
}

console.log('page styles')
console.log(JSON.stringify(styles.page))

const Routes = ({ state }: Props) => {
  // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
  return (
    <div style={styles.page}>
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
