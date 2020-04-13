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
export const LOG: boolean =
  (process.env.REACT_APP_LOG || '').toLowerCase() === 'true' && process.env.NODE_ENV !== 'production'

// error logging tool
export const SENTRY_DSN: string | null = process.env.SENTRY_DSN || null

// uri path to the users project workspace
export const WORKSPACE_ROOT: string = getWorkspaceRoot()

// Possible values are 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
// @ts-ignore
export const OS_PLATFORM: 'win32' | 'linux' | 'darwin' = os.platform()
