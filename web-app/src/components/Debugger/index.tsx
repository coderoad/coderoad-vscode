import * as React from 'react'
import * as G from 'typings/graphql'
import * as CR from 'typings'

interface Props {
	state: string
	tutorial: G.Tutorial
	position: CR.Position
	progress: CR.Progress
	children: React.ReactElement
}

const Debugger = ({ state, children, position, progress, tutorial  }: Props) => (
  <div style={{ backgroundColor: '#FFFF99', color: 'black', padding: '.5rem' }}>
    <h4>state: {state}</h4>
		<p>tutorial: {tutorial ? tutorial.id : 'none'}</p>
    <p style={{ backgroundColor: 'khaki', padding: '.5rem' }}>position: {JSON.stringify(position)}</p>
		<p style={{ backgroundColor: 'moccasin', padding: '.5rem' }}>progress: {JSON.stringify(progress)}</p>
		{children}
  </div>
)

export default Debugger
