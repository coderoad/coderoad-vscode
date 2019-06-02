import * as CR from 'typings'
import onSaveHook from './save'

const vscodeAction = (action: CR.Action) => {
    switch (action.type) {
        case 'ON_FILE_SAVE_RUN_TEST': {
            onSaveHook(action.payload.languages)
        }
    }
}