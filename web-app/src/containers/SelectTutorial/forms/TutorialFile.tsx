import * as React from 'react'
import * as TT from 'typings/tutorial'
import { css, jsx } from '@emotion/core'
import { Icon, Form } from '@alifd/next'
import { Theme } from '../../../styles/theme'

const FormItem = Form.Item

interface Props {
  onLoadSummary(data: TT.Tutorial): void
}

const styles = {
  form: {
    maxWidth: '600px',
    padding: '0 0.3rem',
  },
  uploadLabel: (theme: Theme) => ({
    padding: '0.3rem 0.5rem',
    outline: `1.5px solid ${theme['$color-line1-3']}`,
    fontSize: theme['$form-element-medium-font-size'],
    fontFamily: theme['$font-family-base'],
    color: theme['$color-text1-3'],
  }),
  uploadButton: {
    display: 'none',
  },
}

const TutorialFile = (props: Props) => {
  const onChange = (evt: any) => {
    evt.preventDefault()
    const files = evt.target.files

    if (!files.length) {
      alert('No file select')
      return
    }
    const uploadedFile = files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      // TODO: handle errors from invalid JSON
      const fileJson: TT.Tutorial = JSON.parse(e.target.result)
      props.onLoadSummary(fileJson)
    }
    reader.readAsText(uploadedFile)
  }

  return (
    <Form css={styles.form}>
      <FormItem label="Load coderoad config.json">
        <br />
        <label css={styles.uploadLabel}>
          <Icon type="upload" size="xs" />
          &nbsp;&nbsp;Upload
          <input css={styles.uploadButton} type="file" accept="application/json" onChange={onChange} />
        </label>
        <br />
      </FormItem>
      <br />
    </Form>
  )
}

export default TutorialFile
