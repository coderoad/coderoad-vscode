import * as G from 'typings/graphql'
import * as CR from 'typings'

// // TODO: refactor into a single calculation
export default {
	hasNextStep: (context: CR.MachineContext): boolean => {
		const {tutorial, position} = context
		// TODO: protect against errors
		const steps: G.Step[] = tutorial.version.levels.find((l: G.Level) => l.id === position.levelId).stages.find((s: G.Stage) => s.id === position.stageId).steps

		// TODO: verify not -1
		return !(steps.indexOf(position.stepId) === steps.length - 1)
	},
	hasNextStage: (context: CR.MachineContext): boolean => {
		const {tutorial, position} = context
		// TODO: protect against errors
		const stages: G.Stage[] = tutorial.version.levels.find((l: G.Level) => l.id === position.levelId).stages

		// TODO: verify not -1
		return !(stages.indexOf(position.stageId) === stages.length - 1)
	},
	hasNextLevel: (context: CR.MachineContext): boolean => {
		const {tutorial, position} = context
		// TODO: protect against errors
		const levels: G.Level[] = tutorial.version.levels

		// TODO: verify not -1
		return !(levels.indexOf(position.levelId) === levels.length - 1)
	},
}
