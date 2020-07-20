import * as React from 'react'

const styles = {
  scrollIndicator: {
    position: 'fixed' as 'fixed',
    bottom: '2rem',
  },
}

type Props = {
  item: string
  children: React.ReactElement
}

const ScrollContent = ({ item, children }: Props) => {
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false)
  const pageTopRef: React.RefObject<any> = React.useRef(null)
  const pageBottomRef: React.RefObject<any> = React.useRef(null)

  const scrollToTop = () => {
    pageTopRef.current.scrollIntoView({ behavior: 'smooth' })
    let hideTimeout: any

    // API to detect if an HTML element is in the viewport
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver(
      ([entry]) => {
        // show a scroll indicator to let the user know
        // they can scroll down for more
        const isVisible = !entry.isIntersecting
        setShowScrollIndicator(isVisible)
        if (!isVisible) {
          hideTimeout = setTimeout(() => {
            setShowScrollIndicator(false)
          }, 3000)
        }
      },
      {
        rootMargin: '0px',
      },
    )

    const showTimeout = setTimeout(() => {
      // detect if bottom of page is visible

      if (pageBottomRef.current) {
        observer.observe(pageBottomRef.current)
      }
    }, 300)
    return () => {
      // cleanup timeouts & subs
      observer.unobserve(pageBottomRef.current)
      clearTimeout(showTimeout)
      clearTimeout(hideTimeout)
    }
  }

  React.useEffect(scrollToTop, [item])

  console.log(`showScrollIndicator = ${showScrollIndicator}`)

  return (
    <>
      <div ref={pageTopRef} />
      {children}
      {showScrollIndicator ? <div style={styles.scrollIndicator}>MORE</div> : null}
      <div ref={pageBottomRef}>BOTTOM</div>
    </>
  )
}

export default ScrollContent
