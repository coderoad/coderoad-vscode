import * as TT from '../../../typings/tutorial'
import * as T from '../../../typings'
import getLastCommitHash from './lastHash'

describe('lastHash', () => {
  it('should grab the last passing hash from a step', () => {
    const position: T.Position = { levelId: '1', stepId: '1.2' }
    const levels: TT.Level[] = [
      {
        id: '1',
        title: '',
        summary: '',
        content: '',
        steps: [
          {
            id: '1.1',
            content: '',
            setup: { commits: ['abcdef1'] },
          },
          {
            id: '1.2',
            content: '',
            setup: { commits: ['abcdef2'] },
          },
        ],
      },
    ]
    const result = getLastCommitHash(position, levels)
    expect(result).toBe('abcdef2')
  })
  it('should grab the last passing hash from a step with several commits', () => {
    const position: T.Position = { levelId: '1', stepId: '1.2' }
    const levels: TT.Level[] = [
      {
        id: '1',
        title: '',
        summary: '',
        content: '',
        steps: [
          {
            id: '1.1',
            content: '',
            setup: { commits: ['abcdef1'] },
          },
          {
            id: '1.2',
            content: '',
            setup: { commits: ['abcdef2', 'abcdef3'] },
          },
        ],
      },
    ]
    const result = getLastCommitHash(position, levels)
    expect(result).toBe('abcdef3')
  })
})
