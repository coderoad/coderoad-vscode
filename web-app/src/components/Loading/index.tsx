import { Loading } from '@alifd/next'
import * as React from 'react'

interface Props {
  message: string
}

const LoadingComponent = ({ message }: Props) => {
  return <Loading tip={message} />
}

export default LoadingComponent
