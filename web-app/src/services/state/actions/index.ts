import editorActions from './editor'
import commandActions from './command'
import contextActions from './context'
import testActions from './test'

const createActions = (editorSend: any) => ({
  ...editorActions(editorSend),
  ...commandActions,
  ...contextActions,
  ...testActions,
})

export default createActions
