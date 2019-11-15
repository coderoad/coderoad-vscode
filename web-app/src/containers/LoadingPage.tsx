import * as React from 'react'
import Loading from '../components/Loading'

interface Props {
	text: string
}

const styles = {
	page: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
}

const LoadingPage = ({ text }: Props) => (
	<div style={styles.page}>
		<Loading text={text} />
	</div>
)

export default LoadingPage
