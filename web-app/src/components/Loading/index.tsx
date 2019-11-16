import * as React from 'react'
import { Loading } from '@alifd/next'

interface Props {
  text: string
}

const LoadingComponent = ({ text }: Props) => {
  return <Loading tip={text} />
}

export default LoadingComponent
