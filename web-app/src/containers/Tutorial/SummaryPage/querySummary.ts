import {gql} from 'apollo-boost'

export default gql`
  query getSummary($tutorialId: ID!, $version: String) {
		tutorial(id: $tutorialId) {
			id
			title
			text
			version(version: $version) {
				version
				coderoadVersion
				levels {
					id
					stages {
						id
						steps {
							id
						}
					}
				}
			}
		}
	}
`
