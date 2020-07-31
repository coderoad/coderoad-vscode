import * as TT from 'typings/tutorial'
import getStepNext from './stepNext'

const level: TT.Level = {
  id: '1',
  title: '',
  summary: '',
  content: '',
  steps: [
    {
      id: '1.1',
      content: 'First',
      setup: { commits: [] },
    },
    {
      id: '1.2',
      content: 'Second',
      setup: { commits: [] },
    },
    {
      id: '1.3',
      content: 'Last',
      setup: { commits: [] },
    },
  ],
}

describe('stepNext', () => {
  it('should LOAD_NEXT_STEP when there is another step and is complete', () => {
    const position = { stepId: '1.1', levelId: '1', complete: true }
    const result = getStepNext(position, level)
    expect(result).toEqual({
      type: 'LOAD_NEXT_STEP',
      payload: {
        step: level.steps[1],
      },
    })
  })
  it('should LOAD_NEXT_STEP to the same step if not complete', () => {
    const position = { stepId: '1.1', levelId: '1', complete: false }
    const result = getStepNext(position, level)
    expect(result).toEqual({
      type: 'LOAD_NEXT_STEP',
      payload: {
        step: level.steps[0],
      },
    })
  })
  it('should LEVEL_COMPLETE when there are no steps', () => {
    const position = { stepId: '1.3', levelId: '1', complete: true }
    const result = getStepNext(position, level)
    expect(result).toEqual({
      type: 'LEVEL_COMPLETE',
    })
  })
  it('should LEVEL_COMPLETE when all steps are complete', () => {
    const position = { stepId: '1.3', levelId: '1', complete: true }
    const result = getStepNext(position, { ...level, steps: [] })
    expect(result).toEqual({
      type: 'LEVEL_COMPLETE',
    })
  })
})
