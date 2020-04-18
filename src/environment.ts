require('dotenv').config({
  path: './web-app/.env',
})

import { getWorkspaceRoot } from './services/workspace'
import * as os from 'os'

// CodeRoad version
export const VERSION: string = process.env.npm_package_version || 'unknown'

// Node env
export type Env = 'test' | 'local' | 'development' | 'production'
// @ts-ignore
export const NODE_ENV: Env = process.env.NODE_ENV || 'production'

// toggle logging in development
export const LOG: boolean = (process.env.REACT_APP_LOG || '').toLowerCase() === 'true'

// error logging tool
export const SENTRY_DSN: string | null = process.env.SENTRY_DSN || null

// uri path to the users project workspace
export const WORKSPACE_ROOT: string = getWorkspaceRoot()

// Possible values are: 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
// The value 'android' may also be returned if Node.js is built on the Android operating system. Android support is experimental.
// @ts-ignore
export const OS_PLATFORM: 'win32' | 'linux' | 'darwin' = os.platform()

const supportedOS = [
  'win32', // windows
  'darwin', // macos
  'linux',
  // 'android' // TODO: validate support
]

if (!supportedOS.includes(OS_PLATFORM)) {
  throw new Error(`OS ${OS_PLATFORM}" not supported with CodeRoad`)
}
