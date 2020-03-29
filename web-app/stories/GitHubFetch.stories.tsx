import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { css, jsx } from '@emotion/core'
import SelectWorkspace from '../src/containers/Check/SelectWorkspace'
import SideBarDecorator from './utils/SideBarDecorator'
import { Form, Input, Select } from '@alifd/next'

const FormItem = Form.Item
const Option = Select.Option

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

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

const GitHubFetch = ({ url }) => {
  if (!url) {
    return null
  }
  const { data, error, loading } = useFetch(url)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  return <div>{JSON.stringify(data)}</div>
}

const tutorials = [
  {
    id: '1',
    title: 'Basic Node & Express',
    configUrl: 'https://raw.githubusercontent.com/coderoad/fcc-basic-node-and-express/master/coderoad-config.json',
  },
  {
    id: '2',
    title: 'Learn NPM',
    configUrl: 'https://raw.githubusercontent.com/coderoad/fcc-learn-npm/master/coderoad-config.json',
  },
]

const SelectTutorial = () => {
  const [url, setUrl] = React.useState(null)
  const handleUrlChange = (value) => {
    setUrl(value)
  }
  return (
    <div>
      <Form style={{ maxWidth: '500px' }}>
        <FormItem label="Select Tutorial:">
          <Select onChange={handleUrlChange} style={{ width: '100%' }}>
            {tutorials.map((tutorial) => (
              <Option key={tutorial.id} value={tutorial.configUrl}>
                {tutorial.title}
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
      <GitHubFetch url={url} />
    </div>
  )
}

storiesOf('GitHub Fetch', module)
  .addDecorator(SideBarDecorator)
  .add('Request', () => {
    return <GitHubFetch url={tutorials[0].configUrl} />
  })
  .add('Select Tutorial', () => {
    return <SelectTutorial />
  })
