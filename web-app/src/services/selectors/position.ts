import { createSelector } from 'reselect'
import * as CR from 'typings'
import * as G from 'typings/graphql'
import * as tutorial from './tutorial'

export const defaultPosition = () => ({
  levelId: '',
  stepId: '',
})

export const initialPosition = createSelector(tutorial.currentVersion, (version: G.TutorialVersion) => {
  const level = version.data.levels[0]
  const position: CR.Position = {
    levelId: level.id,
    stepId: level.steps[0].id,
  }
  return position
})
