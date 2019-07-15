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
    backgroundColor: 'white',
  },
}

const Routes = ({ state }: Props) => {
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth - 20,
    height: window.innerHeight - 20,
  })

  // solution for windows getting off size
  // without adding multiple listeners
  React.useEffect(() => {
    const dimensionsInterval = setInterval(() => {
      setDimensions({
        width: window.innerWidth - 20,
        height: window.innerHeight - 20,
      })
    }, 5000)
    return () => {
      clearInterval(dimensionsInterval)
    }
  })

  // TODO: refactor cond to user <Router><Route> and accept first route as if/else if
  return (
    <div style={{ ...styles.page, ...dimensions }}>
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
