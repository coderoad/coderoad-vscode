import * as React from 'react'

interface Props {
  children: React.ReactElement
}

const resize = () => ({
  width: window.innerWidth - 20,
  height: window.innerHeight - 20,
})

const Workspace = ({ children }: Props) => {
  const [dimensions, setDimensions] = React.useState(resize())

  // solution for windows getting off size
  React.useEffect(() => {
    setDimensions(resize())
  }, [window.innerHeight, window.innerHeight])

  const styles = {
    page: {
      margin: 0,
      backgroundColor: 'white',
    },
  }

  return <div style={{ ...styles.page, ...dimensions }}>{children}</div>
}

export default Workspace
