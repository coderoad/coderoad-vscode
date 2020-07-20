import * as React from 'react'

type Props = {
  item: string
  children: React.ReactElement
}

const ScrollContent = ({ item, children }: Props) => {
  const pageTopRef: React.RefObject<any> = React.useRef(null)

  const pageBottomRef: React.RefObject<any> = React.useRef(null)

  const scrollToTop = () => {
    pageTopRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(scrollToTop, [item])

  return (
    <>
      <div ref={pageTopRef} />
      {children}
      <div ref={pageBottomRef} />
    </>
  )
}

export default ScrollContent
