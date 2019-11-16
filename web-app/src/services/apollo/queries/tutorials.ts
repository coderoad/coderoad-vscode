import { gql } from 'apollo-boost'

export default gql`
  query getTutorials {
    tutorials {
      id
      version {
        version
        createdBy {
          id
        }
        createdAt
        updatedBy {
          id
        }
        updatedAt
        summary {
          title
          description
        }
      }
    }
  }
`
