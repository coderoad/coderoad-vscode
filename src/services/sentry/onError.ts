import * as sentry from '@sentry/node'
// import { Scope } from '@sentry/hub'
import environment from '../../environment'

const onError = (error: Error) => {
  // set user scope https://docs.sentry.io/enriching-error-data/scopes/?platform=node
  sentry.withScope((scope: any) => {
    scope.setTag('VERSION', environment.VERSION)
    // if (user) {
    //   scope.setUser({
    //     id: user.id,
    //     email: user.email || 'unknown',
    //   })
    // }
    sentry.captureException(error)
  })
}

export default onError
