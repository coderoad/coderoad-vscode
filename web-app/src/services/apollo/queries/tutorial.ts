import { gql } from 'apollo-boost'

// TODO: add version to query

export default gql`
  query getTutorial($tutorialId: ID!) {
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
      version {
        id
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
            summary
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
