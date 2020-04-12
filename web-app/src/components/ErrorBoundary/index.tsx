import * as React from 'react'
import onError from '../../services/sentry/onError'
import logger from '../../services/logger'

class ErrorBoundary extends React.Component {
  public state = { errorMessage: null }

  public componentDidCatch(error: Error, info: any) {
    onError(error)
    // Display fallback UI
    this.setState({ errorMessage: error.message })
    // You can also log the error to an error reporting service
    logger('ERROR in component:', JSON.stringify(error))
    logger('ERROR info:', JSON.stringify(info))
  }

  public render() {
    if (this.state.errorMessage) {
      // You can render any custom fallback UI
      return <h1>{this.state.errorMessage}</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
