import { init } from '@sentry/node'
import environment from '../../environment'

if (environment.SENTRY_DSN) {
  init({
    dsn: environment.SENTRY_DSN,
    environment: environment.NODE_ENV,
  })
}
