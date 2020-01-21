import { init } from '@sentry/node'
import environment from '../../environment'

init({
  dsn: 'https://df4a6ae19e8b44ed9a87ae4432dab9df@sentry.io/1889368',
  environment: environment.NODE_ENV,
})
