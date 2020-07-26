import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { Form, Switch } from '@alifd/next'
import AdminContext, { AdminContextType } from './context'

type Props = {}

const AdminToggle = (props: Props) => {
  const { state, dispatch } = React.useContext<AdminContextType>(AdminContext)
  return (
    <Form.Item label="Admin Mode">
      <Switch
        checked={state.adminMode}
        onChange={(checked: boolean) => dispatch({ type: checked ? 'ADMIN_MODE_ON' : 'ADMIN_MODE_OFF' })}
      />
    </Form.Item>
  )
}

export default AdminToggle
