import * as vscode from 'vscode'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import * as E from 'typings/error'
import { satisfies } from 'semver'
import { onEvent } from '../services/telemetry'
import { version, compareVersions } from '../services/dependencies'
import Context from '../services/context/context'
import tutorialConfig from './utils/tutorialConfig'
import { send } from '../commands'
import { setupWebhook } from '../services/hooks/webhooks'

const onTutorialConfigNew = async (action: T.Action, context: Context): Promise<void> => {
  try {
    const data: TT.Tutorial = action.payload.tutorial

    onEvent('tutorial_start', {
      tutorialId: data.id,
      tutorialVersion: data.version,
      tutorialTitle: data.summary.title,
    })

    // validate extension version
    const expectedAppVersion = data.config?.appVersions?.vscode
    if (expectedAppVersion) {
      const extension = vscode.extensions.getExtension('coderoad.coderoad')
      if (extension) {
        const currentAppVersion = extension.packageJSON.version
        const satisfied = satisfies(currentAppVersion, expectedAppVersion)
        if (!satisfied) {
          const error: E.ErrorMessage = {
            type: 'UnmetExtensionVersion',
            message: `Expected CodeRoad v${expectedAppVersion}, but found v${currentAppVersion}`,
          }
          send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
          return
        }
      }
    }

    // setup tutorial config (save watcher, test runner, etc)
    await context.onNew(data)

    // validate dependencies
    const dependencies = data.config.dependencies
    if (dependencies && dependencies.length) {
      for (const dep of dependencies) {
        // check dependency is installed
        const currentVersion: string | null = await version(dep.name)
        if (!currentVersion) {
          // use a custom error message
          const error: E.ErrorMessage = {
            type: 'MissingTutorialDependency',
            message: dep.message || `Process "${dep.name}" is required but not found. It may need to be installed`,
            actions: [
              {
                label: 'Check Again',
                transition: 'TRY_AGAIN',
              },
            ],
          }
          send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
          return
        }

        // check dependency version
        const satisfiedDependency = await compareVersions(currentVersion, dep.version)

        if (!satisfiedDependency) {
          const error: E.ErrorMessage = {
            type: 'UnmetTutorialDependency',
            message: `Expected ${dep.name} to have version ${dep.version}, but found version ${currentVersion}`,
            actions: [
              {
                label: 'Check Again',
                transition: 'TRY_AGAIN',
              },
            ],
          }
          send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
          return
        }

        if (satisfiedDependency !== true) {
          const error: E.ErrorMessage = satisfiedDependency || {
            type: 'UnknownError',
            message: `Something went wrong comparing dependency for ${dep.name}`,
            actions: [
              {
                label: 'Try Again',
                transition: 'TRY_AGAIN',
              },
            ],
          }
          send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
          return
        }
      }
    }

    const error: E.ErrorMessage | void = await tutorialConfig({ data }).catch((error: Error) => ({
      type: 'UnknownError',
      message: `Location: tutorial config.\n\n${error.message}`,
    }))

    // has error
    if (error && error.type) {
      send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
      return
    }

    // configure webhook
    if (data.config?.webhook) {
      setupWebhook(data.config.webhook)
    }

    // report back to the webview that setup is complete
    send({ type: 'TUTORIAL_CONFIGURED' })
  } catch (e) {
    const error = {
      type: 'UnknownError',
      message: `Location: EditorTutorialConfig.\n\n ${e.message}`,
    }
    send({ type: 'TUTORIAL_CONFIGURE_FAIL', payload: { error } })
  }
}

export default onTutorialConfigNew
