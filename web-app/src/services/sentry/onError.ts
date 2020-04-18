import * as sentry from '@sentry/browser'
// import { Scope } from '@sentry/hub'
import { VERSION, NODE_ENV } from '../../environment'

const onError = (error: Error) => {
  if (NODE_ENV === 'production') {
    // set user scope https://docs.sentry.io/enriching-error-data/scopes/?platform=node
    sentry.withScope((scope: any) => {
      scope.setTag('VERSION', VERSION)
      // if (user) {
      //   scope.setUser({
      //     id: user.id,
      //     email: user.email || 'unknown',
      //   })
      // }
      sentry.captureException(error)
    })
  }
}

export default onError
