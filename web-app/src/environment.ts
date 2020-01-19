// validate .env
// const requiredKeys = ['REACT_APP_GQL_URI']
// for (const required of requiredKeys) {
//   if (!process.env[required]) {
//     throw new Error(`Missing Environmental Variables: ${required}`)
//   }
// }

export const GQL_URI: string = process.env.REACT_APP_GQL_URI || 'https://33mf420q4m.execute-api.us-west-2.amazonaws.com/stage/api-stage'
export const DEBUG: boolean = (process.env.REACT_APP_DEBUG || '').toLowerCase() === 'true'
