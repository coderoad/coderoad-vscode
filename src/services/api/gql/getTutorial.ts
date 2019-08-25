import gql from 'graphql-tag'

const getTutorial = gql`
	query getTutorial($tutorialId: ID!) {
		tutorial(id: $tutorialId) {
			id
			testRunner
			codingLanguage
			repo {
				uri
				branch
			}
			version {
				version
				coderoadVersion
				levels {
					id
					setup {
						id
						files
						commits
						commands
					}
					stages {
						id
						setup {
							id
							files
							commits
							commands
						}
						steps {
							id
							setup {
								id
								files
								commits
								commands
							}
							solution {
								id
								files
								commits
							}
						}
					}
				}
			}
		}
	}
`

export default getTutorial