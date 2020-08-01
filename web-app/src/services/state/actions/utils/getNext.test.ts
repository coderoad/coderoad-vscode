import * as TT from 'typings/tutorial'
import getNext from './getNext'

const levels: TT.Level[] = [
  {
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
  },
  {
    id: '2',
    title: '',
    summary: '',
    content: '',
    steps: [
      {
        id: '2.1',
        content: 'First',
        setup: { commits: [] },
      },
      {
        id: '2.2',
        content: 'Second',
        setup: { commits: [] },
      },
      {
        id: '2.3',
        content: 'Last',
        setup: { commits: [] },
      },
    ],
  },
]

describe('getNext', () => {
  it('should NEXT_STEP when there is another step and step complete', () => {
    const position = { levelId: '1', stepId: '1.1', complete: true }
    const result = getNext(position, levels[0], levels)
    expect(result).toEqual({
      type: 'NEXT_STEP',
      payload: { stepId: '1.2', levelId: '1', complete: false },
    })
  })
  it('should NEXT_STEP with same step if step is not complete', () => {
    const position = { levelId: '1', stepId: '1.1', complete: false }
    const result = getNext(position, levels[0], levels)
    expect(result).toEqual({
      type: 'NEXT_STEP',
      payload: position,
    })
  })
  it('should NEXT_LEVEL when there is another level', () => {
    const position = { levelId: '1', stepId: '1.3', complete: true }
    const result = getNext(position, levels[0], levels)
    expect(result).toEqual({
      type: 'NEXT_LEVEL',
      payload: { stepId: '2.1', levelId: '2', complete: false },
    })
  })
  it('should COMPLETED when there are no more levels', () => {
    const position = { levelId: '2', stepId: '2.3', complete: true }
    const result = getNext(position, levels[1], levels)
    expect(result).toEqual({
      type: 'COMPLETED',
    })
  })
})
