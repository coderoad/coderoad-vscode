require('dotenv').config({
  path: './web-app/.env',
})

interface Environment {
  VERSION: string
  NODE_ENV: string
  LOG: boolean
  API_URL: string
  SENTRY_DSN: string | null
}

const environment: Environment = {
  VERSION: process.env.VERSION || 'unknown',
  NODE_ENV: process.env.NODE_ENV || 'production',
  LOG: (process.env.LOG || '').toLowerCase() === 'true',
  API_URL: process.env.REACT_APP_GQL_URI || '',
  SENTRY_DSN: process.env.SENTRY_DSN || null,
}

export default environment
