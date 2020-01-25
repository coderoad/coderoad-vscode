import apiActions from './api'
import commandActions from './command'
import contextActions from './context'
import editorActions from './editor'

export default {
  ...editorActions,
  ...contextActions,
  ...apiActions,
  ...commandActions,
}
