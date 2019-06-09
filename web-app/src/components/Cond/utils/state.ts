export function stateMatch(state: any, statePath: string) {
    let current = state
    let paths = statePath.split('.')
    try {
        for (const p of paths) {
            current = current[p]
        }
    } catch (error) {
        return false
    }
    return current !== undefined
}