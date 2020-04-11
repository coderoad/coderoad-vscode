import { satisfies } from 'semver'
import node from '../node'

const semverRegex = /(?<=^v?|\sv?)(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?(?=$|\s)/gi

export const version = async (name: string): Promise<string | null> => {
  try {
    const { stdout, stderr } = await node.exec(`${name} --version`)
    if (!stderr) {
      const match = stdout.match(semverRegex)
      if (match) {
        return match[0]
      }
    }
    return null
  } catch (error) {
    return null
  }
}

export const compareVersions = async (currentVersion: string, expectedVersion: string): Promise<never | boolean> => {
  // see node-semver docs: https://github.com/npm/node-semver
  return satisfies(currentVersion, expectedVersion)
}
