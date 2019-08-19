import { gql } from 'apollo-boost'

const typeDefs = gql`
  input Progress {
    levels: JSONObject
    stages: JSONObject
    steps: JSONObject
  }
  input Position {
    levelId: String
    stageId: String
    stepId: String
  }
`
export default typeDefs