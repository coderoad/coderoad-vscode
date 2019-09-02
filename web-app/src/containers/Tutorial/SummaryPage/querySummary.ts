import {gql} from 'apollo-boost'

export default gql`
  query getSummary($tutorialId: ID!, $version: String) {
		tutorial(id: $tutorialId) {
			id
			title
			text
			codingLanguage
			testRunner
			repo {
				uri
			}
			version(version: $version) {
				version
				coderoadVersion
				levels {
					id
					setup {
						id
						commands
						commits
						files
					}
					stages {
						id
						setup {
							id
							commands
							commits
							files
						}
						steps {
							id
							setup {
								id
								commands
								commits
								files
							}
							solution {
								id
								commands
								commits
								files
							}
						}
					}
				}
			}
		}
	}
`
