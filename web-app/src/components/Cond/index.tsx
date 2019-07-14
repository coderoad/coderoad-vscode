import * as React from 'react'
import { stateMatch } from './utils/state'

interface Props {
  state: any
  path: string
  children: React.ReactElement
}

const Cond = (props: Props) => {
  if (!stateMatch(props.state, props.path)) {
    return null
  }
  return props.children
}

export default Cond
