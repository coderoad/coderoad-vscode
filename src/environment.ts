require('dotenv').config({
  path: './.env',
})

interface Environment {
  VERSION: string
  NODE_ENV: string
  LOG: boolean
}

const environment: Environment = {
  VERSION: process.env.VERSION || 'unknown',
  NODE_ENV: process.env.NODE_ENV || 'production',
  LOG: (process.env.LOG || '').toLowerCase() === 'true',
}

export default environment
