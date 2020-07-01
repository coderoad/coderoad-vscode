import * as sentry from '@sentry/browser'
import { NODE_ENV, SENTRY_DSN } from '../../environment'
import logger from '../logger'

try {
  if (SENTRY_DSN && NODE_ENV === 'production') {
    sentry.init({
      dsn: SENTRY_DSN,
      environment: NODE_ENV,
    })
  }
} catch (error) {
  logger(`Error in Sentry init: ${error.message}`)
}
