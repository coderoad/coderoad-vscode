import * as React from 'react'

const useFetch = (url: string, options?: object) => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        setLoading(false)
        const json = await res.json()
        setData(json)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [url])
  return { data, error, loading }
}

export default useFetch
