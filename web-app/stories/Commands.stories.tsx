import { storiesOf } from '@storybook/react'
import React from 'react'
import ProcessMessages from '../src/components/ProcessMessages'
import SideBarDecorator from './utils/SideBarDecorator'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

storiesOf('Components', module)
  .addDecorator(SideBarDecorator)
  .add('Processes', () => (
    <ProcessMessages
      processes={[
        {
          title: 'npm install',
          description: 'CLI Setup running',
        },
        {
          title: 'npm test',
          description: 'Test running',
        },
      ]}
    />
  ))
