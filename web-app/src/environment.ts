// validate .env
const requiredKeys = ['REACT_APP_TUTORIAL_LIST_URL']
for (const required of requiredKeys) {
  if (!process.env[required]) {
    throw new Error(`Missing Environmental Variable: ${required}`)
  }
}

export const DEBUG: boolean = (process.env.REACT_APP_DEBUG || '').toLowerCase() === 'true'
export const VERSION: string = process.env.VERSION || 'unknown'
export const NODE_ENV: string = process.env.NODE_ENV || 'development'
export const LOG: boolean = (process.env.REACT_APP_LOG || '').toLowerCase() === 'true'
export const TUTORIAL_LIST_URL: string = process.env.REACT_APP_TUTORIAL_LIST_URL || ''

// config variables
export const DISPLAY_RUN_TEST_BUTTON = (process.env.CODEROAD_DISPLAY_RUN_TEST_BUTTON || 'true').toLowerCase() === 'true'

export const ADMIN_MODE =
  (process.env.CODEROAD_ADMIN_MODE || process.env.STORYBOOK_ADMIN_MODE || '').toLowerCase() === 'true'
