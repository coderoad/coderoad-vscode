import * as React from 'react'
import { Icon } from '@alifd/next'

const styles = {
  scrollIndicator: {
    position: 'fixed' as 'fixed',
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    left: 'calc(50% - 8px)',
    borderRadius: '100%',
    zIndex: 100,
    bottom: '2.2rem',
    boxShadow: '0 0 0 5px transparent',
  },
}

type Props = {
  item: string
  children: React.ReactElement
}

const ScrollContent = ({ item, children }: Props) => {
  const [showScrollIndicator, setShowScrollIndicator] = React.useState<'UNDETERMINED' | 'SHOW' | 'HIDE'>('UNDETERMINED')
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
        const isVisible = entry.isIntersecting
        if (!isVisible && showScrollIndicator === 'UNDETERMINED') {
          setShowScrollIndicator('SHOW')
        }
        hideTimeout = setTimeout(() => {
          setShowScrollIndicator('HIDE')
          observer.unobserve(pageBottomRef.current)
        }, 2000)
      },
      { rootMargin: '0px' },
    )

    const showTimeout = setTimeout(() => {
      // detect if bottom of page is visible

      if (pageBottomRef.current) {
        observer.observe(pageBottomRef.current)
      }
    }, 600)
    return () => {
      // cleanup timeouts & subs
      observer.unobserve(pageBottomRef.current)
      clearTimeout(showTimeout)
      clearTimeout(hideTimeout)
    }
  }

  React.useEffect(scrollToTop, [item])

  return (
    <div css={{ position: 'relative' }}>
      <div ref={pageTopRef} />
      {children}
      {showScrollIndicator === 'SHOW' ? (
        <div style={styles.scrollIndicator}>
          <Icon type="arrow-down" size="small" />
        </div>
      ) : null}
      <div ref={pageBottomRef} />
    </div>
  )
}

export default ScrollContent
