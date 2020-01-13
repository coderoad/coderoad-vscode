interface Environment {
  LOG: boolean
}

const environment: Environment = {
  LOG: (process.env.LOG || '').toLowerCase() === 'test',
}

export default environment
