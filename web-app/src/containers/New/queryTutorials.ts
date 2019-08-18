import { gql } from 'apollo-boost'

export default gql`
  query getTutorials {
    tutorials {
      id
      title
      text
      codingLanguage
      latestVersion {
        version
        coderoadVersion
      }
    }
  }
`
