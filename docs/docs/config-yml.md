---
id: config-file
title: Config File
sidebar_label: Config File
---

An overview of the yaml configuration.

```yaml
# A configuration file for a CodeRoad Tutorial
# This is a YAML-formatted file.

## Your personal version of the tutorial
##
version: '0.1.0'

## Data used to populate the tutorial summary page
##
summary:
  ## The title of your tutorial. Required.
  ##
  title: ''
  ## A description of your tutorial. Required.
  ##
  description: ''
## Data used to configure and setup the tutorial
##
config:
  ## Test runner setup.
  testRunner:
    ## The command called to run the test runner. For example "npm run test", or a path to the test runner binary. Required.
    command: ./node_modules/.bin/mocha
    ## Standard arguments used by a given test runner
    args:
      ## The command arg used to filter tests. Used by "subtasks"
      filter: --grep
      ## The command arg used to convert test runner output to TAP format. See https://testanything.org/ for more. Required.
      tap: --reporter=mocha-tap-reporter
    ## The directory where to run the test runner from. If not specified, tests will run from the root of the project. Optional.
    directory: coderoad
    ## Commits to load to setup the test runner. Optional.
    setup:
      ## A list of commands to run to configure the tutorial
      commands:
        - npm install
    ## App versions helps to ensure compatability with the Extension
    appVersions:
      ## Ensure compatability with a minimal VSCode CodeRoad version
      vscode: '>=0.7.0'
  ## Repo information to load code from
  ##
  repo:
    ## The uri path to the repo containing the code commits. Required.
    uri: https://github.com/coderoad/fcc-learn-npm
    ## The branch on the repo uri that contains the code commits. Required.
    branch: v0.4.1
  ## A list of tutorial dependencies to ensure the environment is setup for the tutorial. Optional.
  ## The dependencies will be checked by running `dependency.name` --version and comparing it to the version provided.
  ##
  dependencies:
    ## The name of the dependency
    - name: node
      ## The version requirement. See https://github.com/npm/node-semver for options.
      version: '>=10'
## A level is made up of
levels:
  - id: '1'
    steps:
      ## Example 1: Opening files
      - id: '1.1'
        ## Setup for the first task. Required.
        setup:
          ## Files to open in a text editor when the task loads. Optional.
          files:
            - package.json
        ## Solution for the first task. Required.
        solution:
          ## Files to open when the solution loads. Optional.
          files:
            - package.json
      ## Example Two: Running commands
      - id: '1.2'
        setup:
          ## CLI commands that are run when the task loads. Optional.
          commands:
            - npm install
        solution:
          commits:
            - commit6
          commands:
            - npm install
      ## Example Three: Watchers
      - id: '1.3'
        setup:
          files:
            - package.json
          ## Listeners that run tests when a file or directory changes.
          watchers:
            - package.json
            - node_modules/some-package
        solution:
          files:
            - package.json
          commits:
            - commit8
  - id: '2'
    steps:
      - id: '2.1'
```
