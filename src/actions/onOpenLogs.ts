import * as T from 'typings'
import { showOutput } from '../services/testRunner/output'

export const onOpenLogs = async (action: T.Action) => {
  const channel = action.payload.channel
  await showOutput(channel)
}

export default onOpenLogs
