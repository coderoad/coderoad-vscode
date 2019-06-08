import React from 'react'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs'
import SideBarDecorator from './utils/SideBarDecorator'

import Level from '../src/components/Level'
import demo from './data/basic'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Level', () => (
    <Level
      level={object('level', demo.data.levels['level1Id'])}
      stages={object('stages', {
        stage1Id: {
          stepList: [],
          content: {
            title: 'Stage 1',
            text: 'some description',
          },
          status: {
            active: false,
            complete: true,
          },
        },
        stage2Id: {
          stepList: [],
          content: {
            title: 'Stage 2',
            text: 'some description',
          },
          status: {
            active: true,
            complete: false,
          },
        },
      })}
      onStageSelect={linkTo('Tutorial SideBar', 'Stage')}
      onBack={linkTo('TUtorial SideBar', 'Summary')}
    />
  ))
