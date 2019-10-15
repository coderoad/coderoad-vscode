import {gql} from 'apollo-boost'

export default gql`
  query getTutorial($tutorialId: ID!, $version: String) {
		tutorial(id: $tutorialId) {
		id
		version (version: $version) {
			version
			summary {
				title
				description
			}
			data {
				config {
					testRunner
					codingLanguages
					repo {
						uri
					}
				}
				init {
					setup {
						commits
						commands
					}
				}
				levels {
					id
					title
					description
					setup {
						commits
						commands
						files
					}
					steps {
						id
						title
						description
						setup {
							commits
							commands
							files
						}
						solution {
							commits
							commands
							files
							}
						}
					}
				}
			}
		}
	}
`
