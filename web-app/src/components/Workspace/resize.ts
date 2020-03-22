import * as React from 'react'

export const useWindowResize = () => {
  const resize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [dimensions, setDimensions] = React.useState(resize())

  // solution for windows getting off size
  React.useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId: any
    const handleResize = () => {
      if (timeoutId) {
        // prevent execution of previous setTimeout
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => setDimensions(resize()), 50)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerWidth, window.innerHeight])
  return dimensions
}
