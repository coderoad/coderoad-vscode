import { init } from '@sentry/node'
import { SENTRY_DSN, NODE_ENV } from '../../environment'

if (SENTRY_DSN) {
  if (NODE_ENV === 'production') {
    init({
      dsn: SENTRY_DSN,
      environment: NODE_ENV,
    })
  }
}
