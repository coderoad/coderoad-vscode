import * as T from 'typings'
import { readFile } from '../services/node'
import logger from '../services/logger'

const onErrorPage = async (action: T.Action): Promise<void> => {
  // Error middleware
  if (action?.payload?.error?.type) {
    // load error markdown message
    const error = action.payload.error
    const errorMarkdown = await readFile(__dirname, '..', '..', 'errors', `${action.payload.error.type}.md`).catch(
      () => {
        // onError(new Error(`Error Markdown file not found for ${action.type}`))
      },
    )

    // log error to console for safe keeping
    logger(`ERROR:\n ${errorMarkdown}`)

    if (errorMarkdown) {
      // add a clearer error message for the user
      error.message = `${errorMarkdown}\n\n${error.message}`
    }
  }
}

export default onErrorPage
