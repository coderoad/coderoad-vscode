// validate .env
// const requiredKeys = ['REACT_APP_GQL_URI']
// for (const required of requiredKeys) {
//   if (!process.env[required]) {
//     throw new Error(`Missing Environmental Variables: ${required}`)
//   }
// }

export const GQL_URI: string =
  process.env.REACT_APP_GQL_URI || 'https://33mf420q4m.execute-api.us-west-2.amazonaws.com/stage/api-stage'
export const DEBUG: boolean = (process.env.REACT_APP_DEBUG || '').toLowerCase() === 'true'
export const VERSION: string = process.env.VERSION || 'unknown'
export const NODE_ENV: string = process.env.NODE_ENV || 'production'
export const AUTH_TOKEN: string | null = process.env.AUTH_TOKEN || null
export const LOG_STATE: boolean = (process.env.LOG_STATE || '').toLowerCase() === 'true'
