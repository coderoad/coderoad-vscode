---
id: create-a-practice-tutorial
title: Create a Practice Tutorial
sidebar_label: Create a Practice Tutorial
---

## Create a CodeRoad tutorial

Follow these instructions carefully to create your first CodeRoad tutorial.

### Create a repo

- Go to GitHub and create a new repository for yourself named `first-tutorial`
- After you click create, it takes you to the repo. Copy the URL for the repo, it should look like: `https://github.com/your-username/first-tutorial.git`
- Open a terminal locally and find a place to clone your repo. Enter `git clone https://github.com/your-username/first-tutorial.git` with the repo URL you copied in place of that URL to clone it
- Create a `.gitignore` file in your repo and add this to it:

```md
node_modules
package-lock.json
```

Add anything else that may interfere such as `.DS_Store` if you are on a mac.

### Create the markdown

- Create a new file in your repo named `TUTORIAL.md`.

This is the file that describes the structure of a tutorial. It contains all the lessons, lesson titles, descriptions, test text and all the other verbiage that will be displayed to a user. Enter this markdown into the file and save it:

```md
# Introduction

This is an introduction to your tutorial. It will show up on the first page when your tutorial is started.

## 1. Create index.html

> Optional summary for Level 1

Here's where you can put a description, examples, and instructions for the lesson.

### 1.1 Level 1 Step 1

This is the test text. Create an `index.html` file to pass this lesson.

#### HINTS

- This is a hint to help people through the test
- Second hint for 1.1, don't worry if the hints don't show up yet
```

The above tutorial has an introduction page and one lesson.

### Commit to GitHub

- Back in the terminal, add all your new files to be committed with `git add .`
- Commit them with `git commit -m "create markdown"`
- Push them to GitHub with `git push origin master`

### Create a version branch

- Create and checkout a new orphan branch with `git checkout --orphan v0.1.0`.

This will make a branch that isn't created from master, so it has no commit history. It will hold the tests for your tutorial. Each test is its own commit. You can also add an optional commit for a solution to each test.

- Check your `git status`
- Delete the tutorial file from this branch with `git rm -f TUTORIAL.md`

### Create your project files

This branch is also where users create their projects, modify files for a tutorial, and anything else that they need to do.

- Make a new folder named `coderoad` on your branch.

This folder will hold as much of the CodeRoad stuff as it can so users aren't confused with extra files in their projects.

- Go to the `coderoad` folder in your terminal and run `npm init`. Press enter until you are through the setup.
- Open the `package.json` file you just made and make it look like this...

```js
{
  "name": "coderoad",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "programmatic-test": "mocha --reporter=mocha-tap-reporter",
    "test": "mocha"
  },
  "author": "",
  "license": "ISC"
}

```

These scripts will be for CodeRoad and for you to test things.

- From the terminal, in your `coderoad` folder, run `npm install --save mocha mocha-tap-reporter` to install some depenedencies
- **Go back to the main repo folder** and add your changes with `git add .`
- Commit your files with `git commit -m "INIT"`

The message of `INIT` in all caps is necessary. This message is used to add project setup files and anthing else you want to add before a user starts the tutorial.

- Push and Create a branch on your remote with `git push -u origin v0.1.0`

### Create the first test

- Go in the `coderoad` folder and create new folder named `test` in it
- Create a file named `first-tutorial.test.js` in the `test` folder
- Add this to the file:

```js
const assert = require('assert')
const fs = require('fs')
const util = require('util')
const path = require('path')

const readdir = util.promisify(fs.readdir)
const getRootDir = async (dir = process.cwd()) => {
  const pathToRoot = path.join(dir, '..')
  const rootDir = await readdir(pathToRoot)

  if (!rootDir) {
    throw new Error(`Could not find folder ${pathToRoot}`)
  }

  return rootDir
}

describe('first-tutorial folder', () => {
  let rootDir
  before(async () => {
    rootDir = await getRootDir()
  })

  it('should have an index.html file', async () => {
    assert(rootDir.indexOf('index.html') >= 0)
  })
})
```

This will be the test for the one lesson in your tutorial. You can see that it checks for the existence of an `index.html` file in the root folder.

- In the `coderoad` folder, run `npm run programmatic-test` from the terminal

It will fail since `index.html` doesn't exist.

- Create an `index.html` file in the main repo folder and run the test again

It should pass this time. So when a user creates the `index.html` file, this test will run, and the lesson will pass.

### Commit your first test

- Go back to the main repo folder and add the test file to be committed with `git add coderoad/.`
- Commit it with `git commit -m "1.1"`

That stands for "Lesson 1 Step 1 Setup & Tests". You can put an additional note after it, but it has to start with those letters so CodeRoad knows that this is the test for the 1.1 step.

- After that, add the index file with `git add index.html`
- Commit the file with `git commit -m "1.1S"`

That stands for "Lesson 1 Step 1 Solution", and it's the solution to the test.

- Take a quick look at the commit history with `git log`. You can see the messages there, they align with the titles you put in the markdown and there's one commit for the test (`1.1`) and an optional commit for the solution (`1.1S`)
- Push your changes to GitHub with `git push origin v0.1.0`

### Create the YAML file

- Go back to your master branch with `git checkout master`
  You can think of these two branches like separate repositories, the branches will never merge and the files will always be different, even if some look the same.
- Create a new file named `coderoad.yaml` and add this to it:

```yml
version: '0.1.0'
config:
  testRunner:
    command: ./node_modules/.bin/mocha
    args:
      tap: --reporter=mocha-tap-reporter
    directory: coderoad
  setup:
    commands:
      - cd coderoad && npm install
  repo:
    uri: https://github.com/moT01/first-tut
    branch: v0.1.0
  dependencies:
    - name: node
      version: '>=10'
levels:
  - id: '1'
    steps:
      - id: '1.1'
```

Replace the `repo uri` URL with your GitHub repo, note that it's just the username and repo in the URL. This file links everything together. You can see the repo URL and the branch that you created. And the `1.` and `1.1` ID's that match the markdown. You can also add commands that will run when a lesson has started, as well as a host of other things.

- Add this with `git add .`
- Commit it with `git commit -m "create yaml"`

The commit messages on master can be whatever you want.

- Push it to GitHub with `git push origin master`

### Build the config.json file

You created the three things a tutorial needs from you; the markdown, the commits, and the yaml. Now you can build it. If you haven't installed the CodeRoad CLI tools, use `npm install -g @coderoad/cli` to do so.

- Run `coderoad build` from the terminal on the master branch

If you didn't get any errors, it will have created a `tutorial.json` file which is what CodeRoad uses to find all the files, commits, and instructions you created. You should see it in your repo now.

### Open your tutorial

To check out your tutorial, install the CodeRoad extension to VS Code if you haven't already

- Open a new VS Code window
- Put a **single empty folder** in the workspace
- Open the command palette with `ctrl+shift+p`
- Enter `CodeRoad: Start` in the search to start CodeRoad
- Click `Start New Tutorial`
- Click the `File` option
- Click `Upload`
- Find the `tutorial.json` file that you created in your repo folder and upload it

### Review

Success! You can see the introduction page. It may not be a bad idea to take a look at the markdown file again to see it next to the running tutorial.

Notice that when you click the `start` button, you can see that `npm install` is run in the `coderoad` folder, and the dependencies are installed. This is an instruction in your `coderoad.yaml` file.

After you click start, open up any file and press `cmd+s` to save. This will run the tests. They should fail. After that, create the `index.html` file, and save it. The tests should run and pass this time :smile:

Keep this VS Code window open and go back to your other one.

### Add a second lesson

Your tutorial probably needs more than one lesson.

- Go back to the markdown file and add this at the bottom (make sure there's an empty line between the two lessons):

```md
## 2. Add DOCTYPE

> Add a DOCTYPE to an HTML file

HTML files should have a `DOCTYPE`. You can add one at the top of the `index.html` file like this: `<!DOCTYPE html>`.

### 2.1

Add the DOCTYPE

#### HINTS

- Add `<!DOCTYPE html>` at the top of `index.html` and save the file
```

#### Use git to

- Add all the files
- Commit the files with any message
- Push the changes to GitHub

### Add second lesson test

- Checkout your version branch again
- Add a new test to your `.test` file below the other one, it can look like this:

```js
const readFile = util.promisify(fs.readFile)
const getIndexFile = async (dir = process.cwd()) => {
  const pathToIndex = path.join(dir, '..', 'index.html')
  const indexFile = await readFile(pathToIndex)

  if (!indexFile) {
    throw new Error(`Could not find ${pathToIndex}`)
  }
  return indexFile
}

describe('index.html', () => {
  let indexFile
  before(async () => {
    indexFile = await getIndexFile()
  })

  it('should have a DOCTYPE', () => {
    assert(/<!DOCTYPE html>/i.test(indexFile))
  })
})
```

That should check if `<!DOCTYPE html>` was added to the `index.html` file.

- Run the test to make sure it fails (`npm run programmatic-test` from the `coderoad` folder)

There should be one passing and one failing test

- Add `<!DOCTYPE html>` to the `index.html` file
- Run the test again to see if it passed after adding that

### Commit second test

#### Go to the root folder and

- Add **only** the `.test` file to git to be committed
- Commit it with a message of "2.1"
- Add the `index.html` file to be committed
- Commit it with a message of "2.1S"
- Push your changes to GitHub to your `v0.1.0` branch

### Update the YAML

You added another lesson in the markdown, and the tests for it. Just need to update the YAML

- Go back to the master branch
- Add this at the bottom of the `.yaml` file, make sure the indentation is perfect and aligns with the first lesson:

```yml
- id: '2'
  steps:
    - id: '2.1'
      setup:
        files:
          - index.html
```

- Add, Commit, and Push your changes

### Rebuild

- Run `coderoad build` again on your master branch (cross your fingers).

### Restart the tutorial

- Go back to your CodeRoad tutorial if its still open
- In order to start over, close CodeRoad
- Delete All the files from the workspace, but leave the top level folder there
- Start CodeRoad back up
- Start a new tutorial using the `tutorial.json` file you just created.

You should have two lessons to go through now :smile:
