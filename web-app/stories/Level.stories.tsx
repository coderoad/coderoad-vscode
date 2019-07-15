import React from 'react'

import { object, withKnobs } from '@storybook/addon-knobs'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from './utils/SideBarDecorator'

import Level from '../src/components/Level'

storiesOf('Tutorial SideBar', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Level', () => (
    <Level
      level={object('level', {
        content: {
          text: 'A description of this stage',
          title: 'Sum Level',
        },
        stageList: ['stage1Id', 'stage2Id', 'stage3Id'],
      })}
      stages={object('stages', {
        stage1Id: {
          content: {
            text: 'some description',
            title: 'First',
          },
          status: {
            active: false,
            complete: true,
          },
          stepList: [],
        },
        stage2Id: {
          content: {
            text: 'some description',
            title: 'Second',
          },
          status: {
            active: true,
            complete: false,
          },
          stepList: [],
        },
        stage3Id: {
          content: {
            text: 'some description',
            title: 'Third',
          },
          status: {
            active: false,
            complete: false,
          },
          stepList: [],
        },
      })}
      onNext={linkTo('Tutorial SideBar', 'Stage')}
      onBack={linkTo('TUtorial SideBar', 'Summary')}
    />
  ))
