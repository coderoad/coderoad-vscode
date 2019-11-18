import editorActions from './editor'
import contextActions from './context'
import apiActions from './api'
import commandActions from './command'

export default {
  ...editorActions,
  ...contextActions,
  ...apiActions,
  ...commandActions,
}
