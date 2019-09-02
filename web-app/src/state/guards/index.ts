import * as CR from 'typings'
import {TutorialModel} from '../../services/tutorial'


// TODO: refactor into a single calculation
export default (tutorialModel: TutorialModel) => ({
	hasNextStep: (): boolean => {

		const nextPosition: CR.Position = tutorialModel.nextPosition()

		const sameStage = nextPosition.stageId === tutorialModel.position.stageId
		const sameStep = nextPosition.stepId === tutorialModel.position.stepId

		const hasNext: boolean = sameStage && sameStep

		console.log('GUARD: hasNextStep', hasNext)
		return hasNext
	},
	hasNextStage: (): boolean => {
		const nextPosition: CR.Position = tutorialModel.nextPosition()

		const sameLevel = nextPosition.levelId === tutorialModel.position.levelId
		const sameStage = nextPosition.stageId === tutorialModel.position.stageId

		const hasNext: boolean = sameLevel && sameStage

		console.log('GUARD: hasNextStage', hasNext)
		return hasNext
	},
	hasNextLevel: (): boolean => {
		const nextPosition: CR.Position = tutorialModel.nextPosition()

		const sameLevel = nextPosition.levelId === tutorialModel.position.levelId

		const hasNext: boolean = sameLevel

		// TODO: ensure this accounts for end
		console.log('GUARD: hasNextLevel', hasNext)
		return hasNext
	},
})
