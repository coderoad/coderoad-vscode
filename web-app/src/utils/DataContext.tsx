import * as React from 'react'
import * as CR from 'typings'

export const initialState = { SelectTutorial: 'Initial ' }
export const initialData: CR.MachineContext = {
  position: { levelId: '', stageId: '', stepId: '' },
  data: {
    summary: {
      title: '',
      description: '',
      levelList: [],
    },
    levels: {},
    stages: {},
    steps: {},
  },
  progress: { levels: {}, stages: {}, steps: {}, complete: false },
}

const DataContext = React.createContext({ state: initialState, ...initialData })

export default DataContext