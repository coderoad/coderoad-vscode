import { satisfies } from 'semver'
import { exec } from '../node'

const semverRegex =
  /(?<=^v?|\sv?)(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?(\.windows.[0-9]+)?(?=$|\s)/gi

export const getVersion = async (name: string): Promise<{ version: string | null; error: Error | null }> => {
  try {
    const { stdout, stderr } = await exec({ command: `${name} --version` })
    if (!stderr) {
      const match = stdout.match(semverRegex)
      if (match) {
        const parsedVersion = match[0].split('.').slice(0, 3).join('.')
        return { version: parsedVersion, error: null }
      }
    }
    return { version: null, error: null }
  } catch (error: any) {
    return { version: null, error }
  }
}

export const compareVersions = async (currentVersion: string, expectedVersion: string): Promise<never | boolean> => {
  // see node-semver docs: https://github.com/npm/node-semver
  return satisfies(currentVersion, expectedVersion)
}
