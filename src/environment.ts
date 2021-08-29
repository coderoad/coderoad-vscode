import { getWorkspaceRoot } from './services/workspace'
import * as os from 'os'

export const VERSION = require('../package.json').version // eslint-disable-line

export const EXTENSION_ID = 'coderoad'

// Node env
export type Env = 'test' | 'local' | 'development' | 'production'
// @ts-ignore
export const NODE_ENV: Env = process.env.NODE_ENV || 'development'

// toggle logging in development
export const LOG = false

// error logging tool
export const INSTRUMENTATION_KEY = '6ff37c76-72f3-48e3-a1b9-d5636f519b7b'

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

export const TUTORIAL_URL: string | null = process.env.CODEROAD_TUTORIAL_URL || null

export const DISABLE_RUN_ON_SAVE = (process.env.CODEROAD_DISABLE_RUN_ON_SAVE || '').toLowerCase() === 'true'

// bypass "Refused to execute inline script because it violates the following Content Security Policy directive" issue
// for multiple exemptions, separate each with a space "a1 b1"
export const CONTENT_SECURITY_POLICY_EXEMPTIONS: string | null =
  process.env.CODEROAD_CONTENT_SECURITY_POLICY_EXEMPTIONS || null

// optional token for authorization/authentication of webhook calls
export const WEBHOOK_TOKEN = process.env.CODEROAD_WEBHOOK_TOKEN || null
