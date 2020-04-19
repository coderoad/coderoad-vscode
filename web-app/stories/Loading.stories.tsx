import { storiesOf } from '@storybook/react'
import * as T from '../../typings'
import React from 'react'
import LoadingPage from '../src/containers/Loading'
import SideBarDecorator from './utils/SideBarDecorator'

storiesOf('Components', module)
  .addDecorator(SideBarDecorator)
  .add('Loading', () => <LoadingPage text="Content" />)
  .add('Loading processes', () => {
    const processes: T.ProcessEvent[] = [
      {
        title: 'title',
        description: 'description...',
        status: 'RUNNING',
      },
    ]
    return <LoadingPage text="Content" processes={processes} />
  })
