import * as React from 'react'
import { Button, Form, Input } from '@alifd/next'

const FormItem = Form.Item

interface Props {
  defaultUrl: string
  onTutorialLoad(url: string): void
}

const TutorialUrl = (props: Props) => {
  const [url, setUrl] = React.useState(props.defaultUrl)
  const onSubmit = (e: any) => {
    e.preventDefault()
    console.log('tutorial url', url)
    props.onTutorialLoad(url)
  }

  return (
    // @ts-ignore seems to be an onSubmit event ts error in lib
    <Form style={{ maxWidth: '600px' }} onSubmit={onSubmit}>
      <FormItem label="URL path to coderoad config.json">
        <Input
          size="large"
          placeholder="https://raw.githubusercontent.com/coderoad/fcc-learn-npm/master/coderoad-config.json"
          defaultValue={props.defaultUrl}
          onChange={setUrl}
          aria-label="input url path to coderoad config.json"
        />
      </FormItem>
      <Button htmlType="submit" type="primary">
        Load
      </Button>{' '}
      &nbsp;&nbsp;
    </Form>
  )
}

export default TutorialUrl
