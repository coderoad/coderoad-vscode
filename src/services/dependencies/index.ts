import node from '../node'

const semverRegex = /(?<=^v?|\sv?)(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|[\da-z-]*[a-z-][\da-z-]*))*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?(?=$|\s)/gi

export const getVersion = async (name: string): Promise<string | null> => {
  const { stdout, stderr } = await node.exec(`${name} --version`)
  if (!stderr) {
    const match = stdout.match(semverRegex)
    if (match) {
      return match[0]
    }
  }
  return null
}
