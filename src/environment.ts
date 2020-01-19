require('dotenv').config({
  path: './.env',
})

interface Environment {
  LOG: boolean
}

const environment: Environment = {
  LOG: (process.env.LOG || '').toLowerCase() === 'true',
}

export default environment
