import editorActions from './editor'
import contextActions from './context'
import apiActions from './api'

export default {
	...editorActions,
	...contextActions,
	...apiActions,
}
