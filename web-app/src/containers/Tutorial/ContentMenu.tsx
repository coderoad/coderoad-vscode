import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { Menu } from '@alifd/next'
import Icon from '../../components/Icon'

interface Props {
  tutorial: TT.Tutorial
  position: T.Position
  progress: T.Progress
  setTitle: (title: string) => void
  setContent: (content: string) => void
}

const ContentMenu = ({ tutorial, position, progress, setTitle, setContent }: Props) => {
  const setMenuContent = (levelId: string) => {
    const selectedLevel: TT.Level | undefined = tutorial.levels.find((l: TT.Level) => l.id === levelId)
    if (selectedLevel) {
      setTitle(selectedLevel.title)
      setContent(selectedLevel.content)
    }
  }
  return (
    <Menu>
      {tutorial.levels.map((level: TT.Level) => {
        const isCurrent = level.id === position.levelId
        const isComplete = progress.levels[level.id]
        let icon
        let disabled = false

        if (isComplete) {
          // completed icon
          icon = <Icon type="minus" size="xs" />
        } else if (isCurrent) {
          // current icon`
          icon = <Icon type="minus" size="xs" />
        } else {
          // upcoming
          disabled = true
          icon = <Icon type="lock" size="xs" />
        }
        return (
          <Menu.Item key={level.id} disabled={disabled} onSelect={() => setMenuContent(level.id)}>
            {icon}&nbsp;&nbsp;&nbsp;{level.title}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default ContentMenu
