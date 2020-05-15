---
id: build-tutorial
title: Building a Tutorial
sidebar_label: Building a Tutorial
---

A tutorial is made up of two parts:

1. Markdown
2. Git Commits

We'll go into each in detail in more detail.

## 1. Markdown

The markdown is the meta data that pulls the tutorial together.

### Example

See a rough example below:

```md
# Tutorial Title

> Tutorial summary description

\`\`\`config
config:
testRunner:
command: command to run tests
fileFormats: - fileType (eg. JS, TS, etc)
repo:
uri: https://path/to/repo
branch: git-branch
\`\`\`

## Level Name

> Level summary description

Level content in a paragraph. The text that appears when you load a level.

### Step Name

\`\`\`config
setup:
files: - file-to-open.js
commits: - 'setup-commit-hash'
commands: - command to run
watchers: - files to watch and run tests if they change
solution:
files: - file-to-open.js
commits: - 'solution-commit-hash'
\`\`\`

Text to describe the step.
```

### Format

From a hierarchy perspective, a tutorial is made up of levels, which are made up of steps. When each level or step is loaded, if a config is provided, it will run in the extension.

Level

- Optional level setup config
- Steps
  - Step setup config
  - Step solution config

### Parser

Markdown is parsed by a CLI script and converted into JSON. The JSON is loaded as the core of the tutorial.

## 2. Git Commits

A CodeRoad tutorial runs on Git commits:

1. init
   - Basic project setup code
   - test runner dependencies
   - .vscode workspace configurations
2. setup
   - add unit tests
   - add unit testing dependencies
   - add scaffolding code (if needed)
3. solution
   - the code required to make the tests pass

Then repeat steps 2 & 3.

### Init Commit

Include basic setup for your project.

The first commit requires some necessary setup. See an example: [init · ShMcK/coderoad-fcc-basic-node-and-express@c722f9e · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/c722f9e9ec8f94d7fba04cfa3375e0896346ced0). A JS project should include:

- .gitignore - ignore `package-lock.json` or it will cause merge conflicts
- .vscode/extensions - would recommend “dbaeumer.vscode-eslint”
- .vscode/launch.json - file for running the debugger
- .vscode/settings.json - ensure that `formatOnSave` and linting are enabled
- README.md
- package.json - include test commands - include repo - include test runner dependencies

If starting a project with React, bear in mind that create-react-app runs some pretty hacky processes behind the scenes. You can use the following boilerplate in your project: [init with coderoad react tutorial starter · ShMcK/coderoad-tutorial-tweeter@059e004 · GitHub](https://github.com/ShMcK/coderoad-tutorial-tweeter/commit/059e0041691f39e3bf078022512d01a93214b6bb)

### Test Runner

Test output is parsed by the test runner to see if tests have passed or failed.

Currently, it’s required that the test runner produce “TAP” output.: [Home - Test Anything Protocol](https://testanything.org/). Mostly because every test runner produces different output, and it’s easier to use a pre-existing standard available for most test runners rather than to write output parsers for every test runner. See a list of common tap producers: [TAP Producers - Test Anything Protocol](https://testanything.org/producers.html).

See an example using “Mocha” and the “Mocha Tap Reporter”:

```json
{
“scripts”: {
    “programmatic-test”: “mocha —reporter=mocha-tap-reporter”,
    “test”: “mocha”
  },
  “devDependencies”: {
    “mocha”: “^7.0.1”,
    “mocha-tap-reporter”: “^0.1.3”
  }
}
```

In this example, the extension can run `nom run programmatic-test` to run the tests as TAP, but the user can still run `nom run test` to see a more human readable output.

Ideally, try to choose a test runner that performs quickly. If possible, avoid Jest as it has slow install and running times.

### Types of Tests

Integration tests are usable, but slower. Unit tests are fastest whenever possible.

That said, anything can be tested. I’ll include some examples below of tests I’ve made for inspiration.

##### Equality

Testing equality
Eg. <https://github.com/ShMcK/coderoad-tutorial-js-bug-hunter/commit/75b32ebee89853deb3b4dad6aa8654f89bc72cff>

##### Spy/Listener

Code that listens for something to have been called. Use a spy.
Eg. [1.2 console log · ShMcK/coderoad-fcc-basic-node-and-express@ec62e7b · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/ec62e7b2cd65173a503dc2bd6be71c46f66f7c25)

##### Dependency Installed

Watch for a dependency to be installed.
Eg. [1.1 install express · ShMcK/coderoad-fcc-basic-node-and-express@9e28073 · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/9e28073eb238a5edd41470edc407a4bfe03ebf80)

##### API Test

Code that calls an endpoint and validates the return.
Eg. [2.1 get root · ShMcK/coderoad-fcc-basic-node-and-express@b08cb17 · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/b08cb17822544ee957021c03e53eb57170c93231)

##### File Creation

Check if a file exists.
Eg. [6.1 create .env · ShMcK/coderoad-fcc-basic-node-and-express@eaf4220 · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/eaf4220e6343de2c6bb0dda74e7c347f5e45b242)

##### Regex Code

Run a regex matcher to find a code match. Code can expect to be formatted from the provided linter rules.
Eg. [11.2 body parser middleware · ShMcK/coderoad-fcc-basic-node-and-express@8b416dc · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/8b416dcc1e262310658083a4d40090846e257dd8)

##### React

Test shallow renders with @testing-library/react.
Eg. [setup: working message form input · ShMcK/coderoad-tutorial-tweeter@1c248ff · GitHub](https://github.com/ShMcK/coderoad-tutorial-tweeter/commit/1c248ff9846c5a27c12a2cbbb77cab1d66613be4)
You can also test hooks with @testing-library/react-hooks
Eg. [setup: useText hook refactor · ShMcK/coderoad-tutorial-tweeter@71deafa · GitHub](https://github.com/ShMcK/coderoad-tutorial-tweeter/commit/71deafa34fb0c271e57fb1749df184c0df3bcd8b)

## Editing a Tutorial

When editing markdown, simply edit the markdown and re-run the parser.

When editing code, you'll need to rebase. You can use VSCode as your default editor for Git: <https://blog.soltysiak.it/en/2017/01/set-visual-studio-code-as-default-git-editor-and-diff-tool/.>

Run rebase from a commit or just "root".

```shell
>git rebase -i --root
```

Choose the commit you want to edit

```
pick b73feaf commit 2.1 setup
pick 0a3aa83 commit 2.1 solution
pick 0d67935 commit 2.2 setup
```

Let's say we want to edit step 2.1 Change the word pick to "e".

```
e b73feaf commit 2.1 setup
```

Save the file.

Git should rebase to that commit.

Make your changes, then "add" the changes to git.

To complete rebasing, continue:

```shell
git rebase --continue
```

If something goes wrong during your rebase, run:

```shell
git rebase --abort
```

If you encounter any merge conflicts along the way, resolve them, add the changes and continue as above.
