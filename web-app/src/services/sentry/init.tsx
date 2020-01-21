import * as sentry from '@sentry/browser'
import { NODE_ENV } from '../../environment'

try {
  sentry.init({
    dsn: 'https://701cee76c32a4408b2fcb6af3e139d46@sentry.io/1889371',
    environment: NODE_ENV,
  })
} catch (error) {
  console.log('Error in Sentry init')
  console.log(error)
}
