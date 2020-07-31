import * as TT from 'typings/tutorial'
import getProgress from './getProgress'

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

describe('getProgress', () => {
  it('should accept no progress', () => {
    const position = { levelId: '1', stepId: '1.1', complete: false }
    const result = getProgress(levels, position)
    expect(result).toBe(0)
  })
  it('should account for a completed level that has not continued', () => {
    const position = { levelId: '1', stepId: '1.3', complete: true }
    const result = getProgress(levels, position)
    expect(result).toBe(50)
  })
  it('should use the last completed level', () => {
    const position = { levelId: '2', stepId: '2.1', complete: false }
    const result = getProgress(levels, position)
    expect(result).toBe(50)
  })
  it('should work if a level has no steps', () => {
    const noStepLevels = [
      { ...levels[0], steps: [] },
      { ...levels[1], steps: [] },
    ]
    const position = { levelId: '1', stepId: null, complete: false }
    const result = getProgress(noStepLevels, position)
    expect(result).toBe(0)
  })
  it('should work if a level has no steps but completed', () => {
    const noStepLevels = [
      { ...levels[0], steps: [] },
      { ...levels[1], steps: [] },
    ]
    const position = { levelId: '1', stepId: null, complete: true }
    const result = getProgress(noStepLevels, position)
    expect(result).toBe(50)
  })
  it('should accept a completed tutorial', () => {
    const position = { levelId: '2', stepId: '2.3', complete: true }
    const result = getProgress(levels, position)
    expect(result).toBe(100)
  })
})
