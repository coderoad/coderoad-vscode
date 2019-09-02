import * as React from 'react'
// import { editorDispatch } from './services/vscode'
import * as CR from 'typings'
import Router from './components/Router'
import LoadingPage from './containers/LoadingPage'
import ContinuePage from './containers/Continue'
import NewPage from './containers/New'
import SummaryPage from './containers/Tutorial/SummaryPage'
import LevelSummaryPage from './containers/Tutorial/LevelPage'
import StageSummaryPage from './containers/Tutorial/StagePage'
import CompletedPage from './containers/Tutorial/CompletedPage'

const { Route } = Router

const styles = {
  page: {
    margin: 0,
    backgroundColor: 'white',
  },
}

const tempSend = (action: any) => console.log('sent')

const Routes = () => {
  // const [dimensions, setDimensions] = React.useState({
  //   width: window.innerWidth - 20,
  //   height: window.innerHeight - 20,
  // })

  // // solution for windows getting off size
  // // without adding multiple listeners
  // React.useEffect(() => {
  //   const dimensionsInterval = setInterval(() => {
  //     setDimensions({
  //       width: window.innerWidth - 20,
  //       height: window.innerHeight - 20,
  //     })
  //   }, 5000)
  //   return () => {
  //     clearInterval(dimensionsInterval)
  //   }
  // }, [])

  return (
    <div style={{ ...styles.page }}>
      <Router>
        <Route path="Start.Startup">
          <LoadingPage text="Launching..." />
        </Route>
				<Route path="Start.NewTutorial.SelectTutorial">
          <NewPage send={tempSend}/>
        </Route>
        <Route path="Start.NewTutorial.InitializeTutorial">
          <LoadingPage text="Launching Tutorial..." />
        </Route>
        <Route path="Start.ContinueTutorial">
          <ContinuePage />
        </Route>
				<Route path="Tutorial.Initialize">
          <LoadingPage text="Initializing..." />
        </Route>
				<Route path="Tutorial.LoadNext">
        	<LoadingPage text="Loading..." />
				</Route>
				<Route path="Tutorial.Summary">
					<SummaryPage send={tempSend} context={{} as CR.MachineContext}/>
				</Route>
				<Route path="Tutorial.Level">
					<LevelSummaryPage send={tempSend} context={{} as CR.MachineContext}/>
				</Route>
				<Route path="Tutorial.Stage">
					<StageSummaryPage send={tempSend} context={{} as CR.MachineContext}/>
				</Route>
				<Route path="Tutorial.Completed">
					<CompletedPage />
				</Route>
			</Router>
    </div>
  )
}

export default Routes
