interface Environment {
  GQL_URI: string
  DEBUG: boolean
}

// validate .env
const requiredKeys = ['REACT_APP_GQL_URI']
for (const required of requiredKeys) {
  if (!process.env[required]) {
    throw new Error(`Missing Environmental Variables: ${required}`)
  }
}

export const GQL_URI = process.env.REACT_APP_GQL_URI || ''
export const DEBUG = (process.env.REACT_APP_DEBUG || '').toLowerCase() === 'true'
