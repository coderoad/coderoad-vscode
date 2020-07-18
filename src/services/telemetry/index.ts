import TelemetryReporter from 'vscode-extension-telemetry'
import { EXTENSION_ID, VERSION, INSTRUMENTATION_KEY, NODE_ENV } from '../../environment'

/**
 * Telemetry
 * https://github.com/microsoft/vscode-extension-telemetry
 *
 */

interface Properties {
  [key: string]: string
}

interface Measurements {
  [key: string]: number
}

let reporter: any

export const activate = (): void => {
  if (NODE_ENV === 'production') {
    reporter = new TelemetryReporter(EXTENSION_ID, VERSION, INSTRUMENTATION_KEY)
  }
}

export const deactivate = (): void => {
  if (reporter) {
    reporter.dispose()
  }
}

export const onError = (error: Error, properties?: Properties, measurements?: Measurements): void => {
  if (reporter) {
    reporter.sendTelemetryException(error, properties, measurements)
  }
}

export const onEvent = (eventName: string, properties?: Properties, measurements?: Measurements): void => {
  if (reporter) {
    reporter.sendTelemetryEvent(eventName, properties, measurements)
  }
}
