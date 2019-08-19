import { gql } from 'apollo-boost'

export const SET_STATUS = gql`
  mutation ToggleTodo($progress: Progress!, $position: Position) {
    setStatus(progress: $progress, position: $position) @client
  }
`