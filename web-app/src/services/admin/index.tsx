import * as React from 'react'

type Props = {
  children: React.ReactElement
}

type State = {
  adminMode: boolean
}

type Action = { type: 'ADMIN_MODE_ON' | 'ADMIN_MODE_OFF' }

const AdminContext = React.createContext<{ state: State; dispatch: (action: Action) => void }>({
  state: { adminMode: false },
  dispatch: () => {},
})

export const AdminProvider = (props: Props) => {
  const [state, dispatch] = React.useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'ADMIN_MODE_ON':
          return { ...state, adminMode: true }
        case 'ADMIN_MODE_OFF':
          return { ...state, adminMode: false }
        default:
          throw new Error()
      }
    },
    { adminMode: false },
  )
  return <AdminContext.Provider value={{ state, dispatch }}>{props.children}</AdminContext.Provider>
}

export const AdminConsumer = AdminContext.Consumer
