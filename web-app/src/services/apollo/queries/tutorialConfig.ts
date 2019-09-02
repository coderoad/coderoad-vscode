import {gql} from 'apollo-boost'

const getTutorialConfig = gql`
	query getTutorialConfig($tutorialId: ID!) {
		tutorial(id: $tutorialId) {
			id
			testRunner
			codingLanguage
		}
	}
`

export default getTutorialConfig