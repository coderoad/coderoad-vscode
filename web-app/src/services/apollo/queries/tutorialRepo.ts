import {gql} from 'apollo-boost'

const getTutorialRepo = gql`
	query getTutorialRepo($tutorialId: ID!) {
		tutorial(id: $tutorialId) {
			id
			repo {
				uri
				name
				branch
			}
		}
	}
`

export default getTutorialRepo