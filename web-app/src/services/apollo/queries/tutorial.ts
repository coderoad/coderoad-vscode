import { gql } from 'apollo-boost'

export default gql`
  query getTutorial($tutorialId: ID!, $version: String) {
    tutorial(id: $tutorialId) {
      id
      createdBy {
        id
        name
        email
      }
      summary {
        title
        description
      }
      latestVersion {
        createdAt
        createdBy {
          id
          name
        }
        updatedAt
        updatedBy {
          id
          name
        }
        publishedAt
        publishedBy {
          name
        }
        data {
          config
          levels {
            id
            title
            description
            content
            setup
            steps {
              id
              content
              setup
              solution
            }
          }
        }
      }
    }
  }
`
