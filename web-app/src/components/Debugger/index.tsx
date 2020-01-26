import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { MachineContext } from '../../services/state/playTutorial'

interface Props extends MachineContext {
  state: string
  children: React.ReactElement
}

const Debugger = ({ state, children, position, progress, processes, tutorial }: Props) => (
  <div css={{ backgroundColor: '#FFFF99', color: 'black', padding: '.5rem' }}>
    <h4>state: {state}</h4>
    <p>tutorial: {tutorial ? tutorial.id : 'none'}</p>
    <p css={{ backgroundColor: 'khaki', padding: '.5rem' }}>position: {JSON.stringify(position)}</p>
    <p css={{ backgroundColor: 'moccasin', padding: '.5rem' }}>progress: {JSON.stringify(progress)}</p>
    <p css={{ backgroundColor: 'beige', padding: '.5rem' }}>processes: {JSON.stringify(processes)}</p>
    {children}
  </div>
)

export default Debugger
