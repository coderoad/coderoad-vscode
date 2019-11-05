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
					fileFormats
					repo {
						uri
						branch
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
					content
					setup {
						commits
						commands
						files
					}
					steps {
						id
						content
						setup {
							commits
							commands
							files
							listeners
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
