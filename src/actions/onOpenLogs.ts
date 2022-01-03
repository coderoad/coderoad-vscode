import * as T from 'typings'
import { showOutput } from '../services/logger/output'

export const onOpenLogs = async (action: T.Action): Promise<void> => {
  const channel = action.payload.channel
  await showOutput(channel)
}

export default onOpenLogs
