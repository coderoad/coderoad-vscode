import * as React from 'react'
import { Button, Form, Input } from '@alifd/next'
import logger from '../../../services/logger'

const FormItem = Form.Item

interface Props {
  defaultUrl: string
  onTutorialLoad(url: string): void
}

const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.json/

const TutorialUrl = (props: Props) => {
  const [url, setUrl] = React.useState(props.defaultUrl)
  const [inputState, setInputState] = React.useState<undefined | 'success' | 'error'>()

  const onSubmit = (e: any) => {
    e.preventDefault()
    logger(`Tutorial url: ${url}`)
    props.onTutorialLoad(url)
  }

  const handleChange = (text: string) => {
    setUrl(text)
    !!text.match(urlRegex) ? setInputState('success') : setInputState('error')
  }

  return (
    // @ts-ignore seems to be an onSubmit event ts error in lib
    <Form style={{ maxWidth: '600px' }} onSubmit={onSubmit}>
      <FormItem label="URL path to coderoad config.json">
        <Input
          size="large"
          placeholder="https://raw.githubusercontent.com/coderoad/fcc-learn-npm/master/coderoad-config.json"
          defaultValue={props.defaultUrl}
          onChange={handleChange}
          state={inputState}
          aria-label="input url path to coderoad config.json"
        />
      </FormItem>
      <Button htmlType="submit" type="primary" disabled={inputState !== 'success'}>
        Load
      </Button>{' '}
      &nbsp;&nbsp;
    </Form>
  )
}

export default TutorialUrl
