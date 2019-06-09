import * as React from 'react'

interface Props {
    value: any
}

const Debugger = ({ value }: Props) => (
  <div style={{ backgroundColor: '#FFFF99', color: 'black', padding: '.5rem' }}>
    <h4>state: {JSON.stringify(value.state)}</h4>
    <p style={{ backgroundColor: 'khaki', padding: '.5rem' }}>position: {JSON.stringify(value.position)}</p>
    <p style={{ backgroundColor: 'moccasin', padding: '.5rem' }}>progress: {JSON.stringify(value.progress)}</p>
    <p style={{ backgroundColor: 'papayawhip', padding: '.5rem' }}>data: {JSON.stringify(value.data)}</p>
  </div>
)

export default Debugger