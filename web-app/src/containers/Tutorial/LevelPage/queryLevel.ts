import {gql} from 'apollo-boost'

export default gql`
  query getLevel($tutorialId: ID!, $version: String, $levelId: ID!) {
  tutorial(id: $tutorialId) {
    id
    version(version: $version) {
      version
      coderoadVersion
      level(levelId: $levelId) {
          id
          title
          text
					setup {
						id
						commits
						commands
						files
					}
          stages {
            id
            title
            text
						setup {
							id
							commits
							commands
							files
						}
          }
      }
    }
  }
}
`
