import React from 'react'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: '#6a67ce',
    color: 'white',
    padding: '0.5rem',
  },
  title: {
    fontWeight: 'bold',
  },
}

const NewUserExperienceTutorial = () => {
  return (
    <div css={styles.container}>
      <div>
        <h3 css={styles.title}>What To Do</h3>
        <p>Update the editor code and press save to to complete the list of "Tasks".</p>
      </div>
      <div>
        <h3 css={styles.title}>How It Works</h3>
        <p>
          When you press save in the editor, CodeRoad runs tests to check if you completed the current task and can
          continue to the next task.
        </p>
        <p>
          Progress is tracked and advanced by using Git in the background. On startup, CodeRoad launches a new local Git
          repo. New tasks are loaded as new commits, and your task solution code is automatically saved as the next Git
          commit.
        </p>
      </div>
      <div>
        <h3 css={styles.title}>How to Debug</h3>
        <p>You can debug a tutorial in a number of ways:</p>
        <ol>
          <li>1. Run the VSCode Debugger located in the left hand panel and add breakpoints to the code</li>
          <li>2. Run the tests in the command line (eg. `npm run test`)</li>
          <li>3. Press save in the editor and read the failed test output in the console output</li>
        </ol>
      </div>
    </div>
  )
}

export default NewUserExperienceTutorial
