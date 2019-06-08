import * as CR from 'typings'

export default {
    // skip to the stage if the level has already been started
    hasNoNextLevelProgress: (context: CR.MachineContext): boolean => {
        console.log('GUARD: hasNoNextLevelProgress')
        return false
    },
}
