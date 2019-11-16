import * as React from 'react'

interface Props {
  children: React.ReactElement
}

const resize = () => ({
  minWidth: window.innerWidth - 20,
  minHeight: window.innerHeight - 20,
})

const Workspace = ({ children }: Props) => {
  const [dimensions, setDimensions] = React.useState(resize())

  // solution for windows getting off size
  React.useEffect(() => {
    setDimensions(resize())
  }, [window.innerHeight, window.innerWidth])

  const styles = {
    page: {
      display: 'flex' as 'flex',
      margin: 0,
      backgroundColor: 'white',
    },
  }

  return <div style={{ ...styles.page, ...dimensions }}>{children}</div>
}

export default Workspace
