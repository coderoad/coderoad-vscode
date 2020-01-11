import { gql } from 'apollo-boost'

export default gql`
  query getTutorials {
    tutorials {
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
        publishedAt
        publishedBy {
          id
          name
          email
        }
      }
    }
  }
`
