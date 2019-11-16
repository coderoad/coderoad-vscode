import { gql } from 'apollo-boost'

export default gql`
  mutation Authenticate($machineId: String!, $sessionId: String!, $editor: Editor!) {
    editorLogin(input: { machineId: $machineId, sessionId: $sessionId, editor: $editor }) {
      token
      user {
        id
        name
        email
        avatarUrl
      }
    }
  }
`
