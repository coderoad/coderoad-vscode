import { Loading } from '@alifd/next'
import * as React from 'react'

interface Props {
  text: string
}

const LoadingComponent = ({ text }: Props) => {
  return <Loading tip={text} />
}

export default LoadingComponent
