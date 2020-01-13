import * as React from 'react'

export const useWindowResize = () => {
  const resize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const [dimensions, setDimensions] = React.useState(resize())

  // solution for windows getting off size
  React.useEffect(() => {
    const handleResize = () => {
      setDimensions(resize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return dimensions
}
