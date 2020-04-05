import React from 'react'
import { Collapse, Icon } from '@alifd/next'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './transition.css'

const Panel = Collapse.Panel

const styles = {
  container: {
    position: 'relative' as 'relative',
    transition: 'all .35s',
  },
  header: {
    display: 'flex' as 'flex',
    backgroundColor: '#6a67ce',
    color: 'white',
    padding: '0.5rem',
  },
  title: {
    fontSize: '1rem',
  },
  toggle: {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    width: '1.5rem',
  },
}

type NuxProps = {
  onClose: () => void
  onLoadSolution: () => void
}

const NewUserExperienceTutorialCollapsible = (props: NuxProps) => {
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([])
  return (
    <Collapse onExpand={setExpandedKeys} expandedKeys={expandedKeys}>
      <Panel title="What To Do">
        <div>
          <p>Update the editor code and press save to to complete the list of "Tasks".</p>
        </div>
      </Panel>
      <Panel title="How It Works">
        <div>
          <p>
            When you press save in the editor, CodeRoad runs tests to check if you completed the current task and can
            continue to the next task.
          </p>
          <br />
          <p>
            Progress is tracked and advanced by using Git in the background. On startup, CodeRoad launches a new local
            Git repo. New tasks are loaded as new commits, and your task solution code is automatically saved as the
            next Git commit.
          </p>
        </div>
      </Panel>
      <Panel title="How to Debug">
        <p>You can debug a tutorial in a number of ways:</p>
        <br />
        <ol>
          <li>
            1. Press save in the editor and use the feedback from failed test messages in the console output. The output
            can be found by opening the integrated VSCode terminal, and selecting the tab "Output". Learn more about the
            integrated terminal in VSCode at&nbsp;{' '}
            <a href="https://code.visualstudio.com/docs/editor/integrated-terminal">
              https://code.visualstudio.com/docs/editor/integrated-terminal
            </a>
            .
          </li>
          <br />
          <li>
            2. Run the VSCode Debugger located in the left hand icon panel. To start debugging, press the green arrow
            button at the top labelled "RUN AND DEBUG". Learn more about debugging with the VSCode Debugger at&nbsp;
            <a href="https://code.visualstudio.com/docs/editor/debugging">
              https://code.visualstudio.com/docs/editor/debugging
            </a>
            .
          </li>
          <br />
          <li>
            3. Run the tests in the command line (eg. `npm run test`) and use the output from the tests to debug. Feel
            free to use the integrated VScode terminal noted above or another terminal with the project working
            directory open. .
          </li>
        </ol>
      </Panel>
      <Panel title="I'm Stuck">
        <p>A few tips to help you if you get stuck.</p>
        <ol>
          <li>
            Read the tests. The tests can be found in the test directory and can be read in detail to help you
            understand what's failing.
          </li>
        </ol>
      </Panel>
      <Panel title="Contact">
        We'd love to hear your comments, requests, issues, questions - reach out at{' '}
        <a href="mailto:coderoadapp@gmail.com">coderoadapp@gmail.com</a>.
      </Panel>
    </Collapse>
  )
}

interface Props {
  css?: React.CSSProperties
  onLoadSolution: () => void
}

const NewUserExperienceTutorial = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const onToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div css={{ ...styles.container, ...props.css }}>
      <div css={styles.header} onClick={onToggle} style={{ cursor: 'pointer' }}>
        <span css={styles.toggle}>{isOpen ? <Icon type="close" size="xs" /> : <Icon type="help" size="small" />}</span>
        <span css={styles.title}>Help</span>
      </div>
      <ReactCSSTransitionGroup transitionName="slide" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {isOpen && (
          <NewUserExperienceTutorialCollapsible
            onLoadSolution={props.onLoadSolution}
            onClose={() => setIsOpen(false)}
          />
        )}
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default NewUserExperienceTutorial
