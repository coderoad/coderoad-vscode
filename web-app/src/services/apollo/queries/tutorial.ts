import {gql} from 'apollo-boost'

export default gql`
  query getTutorial($tutorialId: ID!, $version: String) {
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
					title
					text
					setup {
						id
						commands
						commits
						files
					}
					stages {
						id
						title
						text
						setup {
							id
							commands
							commits
							files
						}
						steps {
							id
							title
							text
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
