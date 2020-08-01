import editorActions from './editor'
import commandActions from './command'
import * as contextActions from './context'
import testActions from './testNotify'

const createActions = (editorSend: any) => ({
  ...editorActions(editorSend),
  ...commandActions,
  ...contextActions,
  ...testActions,
})

export default createActions
