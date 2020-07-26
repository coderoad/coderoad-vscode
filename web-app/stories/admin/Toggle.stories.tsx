import * as React from 'react'
import { storiesOf } from '@storybook/react'
import SideBarDecorator from '../utils/SideBarDecorator'
import AdminToggle from '../../src/services/admin/AdminToggle'

storiesOf('Admin', module)
  .addDecorator(SideBarDecorator)
  .add('Toggle', () => {
    return <AdminToggle />
  })
