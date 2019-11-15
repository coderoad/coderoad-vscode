import * as React from 'react'

class ErrorBoundary extends React.Component {
	public state = { hasError: false }

	public componentDidCatch(error: Error, info: any) {
		// Display fallback UI
		this.setState({ hasError: true })
		// You can also log the error to an error reporting service
		console.error(JSON.stringify(error))
		console.log(JSON.stringify(info))
	}

	public render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>
		}
		return this.props.children
	}
}

export default ErrorBoundary
