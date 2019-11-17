import * as React from 'react'

const styles = {
	box: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		border: '1px solid black',
	},
	loading: {
		backgroundColor: 'red',
	},
}

interface Props {
	status: 'COMPLETE' | 'INCOMPLETE' | 'ACTIVE' | 'LOADING'
}

const Checkbox = (props: Props) => {
	const onChange = () => {
		/* read only */
	}

	if (props.status === 'LOADING') {
		return (
			<div style={styles.box}>
				<input
					ref={input => {
						/* ref because unable to apply indeterminate on jsx */
						if (input) {
							input.indeterminate = true
						}
					}}
					type="checkbox"
					checked={false}
					disabled={true}
					onChange={onChange}
				/>
			</div>
		)
	}

	const checked = props.status === 'COMPLETE'

	return (
		<div style={styles.box}>
			<label>
				<input style={styles.input} type="checkbox" checked={checked} onChange={onChange} />
			</label>
		</div>
	)
}

export default Checkbox
