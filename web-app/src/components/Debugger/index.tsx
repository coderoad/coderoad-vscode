import * as React from 'react'
import * as CR from 'typings'

interface Props {
	state: string
	// position: CR.Position
	// progress: CR.Progress
	children: React.ReactElement
}

const Debugger = ({ state, children  }: Props) => (
  <div style={{ backgroundColor: '#FFFF99', color: 'black', padding: '.5rem' }}>
    <h4>state: {state}</h4>
    {/* <p style={{ backgroundColor: 'khaki', padding: '.5rem' }}>position: {JSON.stringify(position)}</p>
		<p style={{ backgroundColor: 'moccasin', padding: '.5rem' }}>progress: {JSON.stringify(progress)}</p> */}
		{children}
  </div>
)

export default Debugger
