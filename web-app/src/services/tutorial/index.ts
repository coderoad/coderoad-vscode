import * as TT from 'typings/tutorial'
// @ts-ignore
import gitUrlParser from 'git-url-parse'

const processTutorial = (tutorial: TT.Tutorial): TT.Tutorial => {
  // define tutorial id as the "owner/repo-name"
  // see docs at https://github.com/IonicaBizau/git-url-parse
  const { repo } = tutorial.config
  const { full_name } = gitUrlParser(repo.uri)
  tutorial.id = `${full_name}:${repo.branch}`

  return tutorial
}

export default processTutorial
