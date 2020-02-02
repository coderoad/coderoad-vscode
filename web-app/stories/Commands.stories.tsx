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
      testStatus={null}
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
  .add('Test Start', () => (
    <ProcessMessages
      testStatus={{
        type: 'loading',
        title: 'Test running...',
      }}
      processes={[]}
    />
  ))
  .add('Test Pass', () => (
    <ProcessMessages
      testStatus={{
        type: 'success',
        title: 'Success!',
      }}
      processes={[]}
    />
  ))
  .add('Test Fail', () => (
    <ProcessMessages
      testStatus={{
        type: 'warning',
        title: 'Fail!',
        content: 'Test failed for some reason',
      }}
      processes={[]}
    />
  ))
