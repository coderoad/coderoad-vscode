import { gql } from 'apollo-boost'

export default gql`
  query getStage($tutorialId: ID!, $version: String, $stageId: ID!) {
  tutorial(id: $tutorialId) {
    id
    version(version: $version) {
      version
      coderoadVersion
      stage(stageId: $stageId) {
          id
          title
          text
          status @client
      }
    }
  }
}
`
