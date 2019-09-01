import {gql} from 'apollo-boost'

export const SET_STATUS = gql`
  mutation SetStatus($progress: Progress!, $position: Position) {
    setStatus(progress: $progress, position: $position) @client
  }
`