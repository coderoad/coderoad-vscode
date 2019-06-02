import { send } from "xstate";
import * as storage from '../../services/storage'
import * as git from '../../services/git'

export default {
    start: async () => {
        const [tutorial, progress, hasGit, hasGitRemote] = await Promise.all([
            storage.getTutorial(),
            storage.getProgress(),
            git.gitVersion(),
            git.gitCheckRemoteExists(),
        ])
        const canContinue = !!(tutorial && progress && hasGit && hasGitRemote)
        send(canContinue ? 'CONTINUE' : 'NEW')
    }
}