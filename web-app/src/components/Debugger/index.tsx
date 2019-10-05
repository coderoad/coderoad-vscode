import * as React from 'react'
import * as G from 'typings/graphql'
import * as CR from 'typings'

interface Props {
  state: string
  tutorial: G.Tutorial
  env: CR.Environment
  position: CR.Position
  progress: CR.Progress
  children: React.ReactElement
}

const Debugger = ({ state, children, env, position, progress, tutorial }: Props) => (
  <div style={{ backgroundColor: '#FFFF99', color: 'black', padding: '.5rem' }}>
    <h4>state: {state}</h4>
    <p>MachineId: {env.machineId}</p>
    <p>SessionId: {env.sessionId}</p>
    <p>tutorial: {tutorial ? tutorial.id : 'none'}</p>
    <p style={{ backgroundColor: 'khaki', padding: '.5rem' }}>position: {JSON.stringify(position)}</p>
    <p style={{ backgroundColor: 'moccasin', padding: '.5rem' }}>progress: {JSON.stringify(progress)}</p>
    {children}
  </div>
)

export default Debugger
