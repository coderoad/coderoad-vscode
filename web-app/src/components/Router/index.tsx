import * as React from 'react'
import Route from './Route'
import { stateMatch } from '../Cond/utils/state'

interface Props {
  state: string
  children: any
}

// router finds first state match of <Route path='' />
const Router = ({ state, children }: Props) => {
  const childArray = React.Children.toArray(children)
  for (const child of childArray) {
    if (stateMatch(state, child.props.path)) {
      return child.props.children
    }
  }
  console.warn(`No Route matches for ${JSON.stringify(state)}`)
  return null
}

Router.Route = Route

export default Router
