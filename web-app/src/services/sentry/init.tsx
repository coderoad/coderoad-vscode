import * as sentry from '@sentry/browser'
import { NODE_ENV, SENTRY_DSN } from '../../environment'

try {
  if (SENTRY_DSN) {
    sentry.init({
      dsn: SENTRY_DSN,
      environment: NODE_ENV,
    })
  }
} catch (error) {
  console.log('Error in Sentry init')
  console.log(error)
}
