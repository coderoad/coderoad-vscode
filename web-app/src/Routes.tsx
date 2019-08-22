import * as React from 'react'

import Router from './components/Router'
import LoadingPage from './containers/LoadingPage'
import ContinuePage from './containers/Continue'
import NewPage from './containers/New'
import TutorialPage from './containers/Tutorial'

const { Route } = Router

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
  }, [])

  return (
    <div style={{ ...styles.page, ...dimensions }}>
      <Router state={state}>
        <Route path="SelectTutorial.Startup">
          <LoadingPage text="Launching..." />
        </Route>
        <Route path="SelectTutorial.NewTutorial.InitializeTutorial">
          <LoadingPage text="Launching Tutorial..." />
        </Route>
        <Route path="SelectTutorial.NewTutorial.SelectTutorial">
          <NewPage />
        </Route>
        <Route path="SelectTutorial.ContinueTutorial">
          <ContinuePage />
        </Route>
        <Route path="Tutorial">
          <TutorialPage state={state} />
        </Route>
      </Router>
    </div>
  )
}

export default Routes
