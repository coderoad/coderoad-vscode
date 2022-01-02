import TelemetryReporter from 'vscode-extension-telemetry'
import { EXTENSION_ID, VERSION, INSTRUMENTATION_KEY } from '../../environment'
import logger from '../logger'

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

export const activate = (subscribeFn: (reporter: any) => void): void => {
  logger(`${EXTENSION_ID} v${VERSION}`)
  reporter = new TelemetryReporter(EXTENSION_ID, VERSION, INSTRUMENTATION_KEY)
  subscribeFn(reporter)
}

export const deactivate = (): void => {
  if (reporter) {
    reporter.dispose()
  }
}

export const onError = (error: Error, properties?: Properties, measurements?: Measurements): void => {
  logger(error, properties, measurements)
  if (reporter) {
    reporter.sendTelemetryException(error, properties, measurements)
  }
}

export const onEvent = (eventName: string, properties?: Properties, measurements?: Measurements): void => {
  logger(eventName, properties, measurements)
  if (reporter) {
    reporter.sendTelemetryEvent(eventName, properties, measurements)
  }
}
