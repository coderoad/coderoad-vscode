import * as React from 'react'
import * as yaml from 'js-yaml'

const useFetch = <T>(url: string, options: object = {}): { data: T | null; error: string | null; loading: boolean } => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        // sometimes returns longer content-types such as "text/plain; charset=utf-8"
        const contentType = res.headers.get('content-type')?.split(';')[0]
        let data
        switch (contentType) {
          case 'application/json':
            data = await res.json()
            break
          case 'text/plain':
          case 'text/yaml':
            const text = await res.text()
            data = yaml.safeLoad(text)
            break
          default:
            throw new Error(`Unsupported content-type "${contentType}"`)
        }

        setLoading(false)
        setData(data)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [url])
  return { data, error, loading }
}

export default useFetch
