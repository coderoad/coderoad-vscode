import * as React from 'react'

const styles = {
	box: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		border: '1px solid black',
		backgroundColor: 'yellow',
	},
}

interface Props {
	status: 'COMPLETE' | 'INCOMPLETE' | 'ACTIVE' | 'LOADING'
}

const Checkbox = (props: Props) => {
	const checked = props.status === 'COMPLETE'
	// const loading = props.state === 'LOADING'
	const onChange = () => {
		/* read */
	}
	return (
		<div style={styles.box}>
			<label>
				<input style={styles.input} type="checkbox" checked={checked} onChange={onChange} />
			</label>
		</div>
	)
}

export default Checkbox
