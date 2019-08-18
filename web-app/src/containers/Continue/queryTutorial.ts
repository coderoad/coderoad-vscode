import { gql } from 'apollo-boost'

export default gql`
  query getTutorial($tutorialId: ID!, $version: String) {
  tutorial(id: $tutorialId) {
    id
    title
    text
    createdBy {
      id
      name
    }
    createdAt
    codingLanguage
    repo {
      uri
      branch
      owner
      name
    }
    version(version: $version) {
      version
      coderoadVersion
    }
  }
}

`
