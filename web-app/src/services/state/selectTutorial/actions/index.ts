import apiActions from './api'
import contextActions from './context'
import editorActions from './editor'

export default {
  ...editorActions,
  ...contextActions,
  ...apiActions,
}
