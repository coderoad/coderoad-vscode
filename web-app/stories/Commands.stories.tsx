import { storiesOf } from '@storybook/react'
import React from 'react'
import ProcessEvents from '../src/components/ProcessEvents'
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
    <ProcessEvents
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
