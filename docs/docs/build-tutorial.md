---
id: build-tutorial
title: Building a Tutorial
sidebar_label: Building a Tutorial
---

## Requirements

To create a tutorial in CodeRoad, there are a few requirements.

1. An understanding of how to write software tests in your target language (JavaScript, Python, etc).
2. A familiarity with Git.

## Disclaimer

Before we start, note that these processes are workarounds to accomplish two necessary goals:

1. an intermediary working product (even without a full featured build tool).
2. zero server costs so that CodeRoad can scale and remain free.

If this project becomes popular, I'll develop an all-encompassing build tool.

If you're interesting in creating a tutorial, reach out at `coderoadapp@gmail.com` and I'll be happy to help!

## Tutorial Elements

At its core, a CodeRoad tutorial is a JSON file. See an [example tutorial.json file](https://raw.githubusercontent.com/coderoad/fcc-learn-npm/master/tutorial.json).

The tutorial JSON file is produced out of several resources:

1. Text (Markdown)
2. Config (YAML)
3. Git Commits on specific branches

CodeRoad uses a [build CLI](https://github.com/coderoad/coderoad-cli) to validate and combine the three core parts.

Let's go through each briefly.

### 1. Text

Markdown is used for formatting, editing and visualizing text the user will see in CodeRoad. If you're unfamiliar with Markdown, checkout [the mastering markdown guide](https://guides.github.com/features/mastering-markdown/).

See an example `TUTORIAL.md` file:

```md
# Tutorial Title

> Tutorial summary introduction

## 1. Title of Lesson 1

> Lesson 1 summary

Lesson 1 decription and content.

### 1.1

A description of what to do for the first task

#### HINTS

- This is a hint for task 1.1
- This is another hint for task 1.1
```

The markdown will be parsed by the build tool to transform this text into the tutorial.json. Note that there is a specific format for the content that you can probably understand from the content.

Note that:

1. Lessons need to start with `## $X.` where `$X` is the lesson number. The text afterwards will display as the lesson title.
2. Tasks need to start with `### $X.$Y`, where `$X` is the lesson number and `$Y` is the task number.

These complications are to make it easy for the build tool to match up levels and tasks.

### 2. Config

To keep configurations clean, the config lives in a `coderoad.yaml` file. If you're unfamiliar with yaml, checkout [a beginners guide to YAML](https://circleci.com/blog/what-is-yaml-a-beginner-s-guide).

The config file describes hooks/actions to run when a lesson starts, a level starts or a task starts.

Add the following to your `coderoad.yaml` file.

```yaml
version: '0.1.0'
config:
  testRunner:
    command: ./node_modules/.bin/mocha
    args:
      filter: --grep
      tap: --reporter=mocha-tap-reporter
    directory: .coderoad
  repo:
    uri: https://github.com/username/repo
    branch: v0.1.0
  dependencies:
    - name: node
      version: '>=10'
  setup:
    commands:
      - cd .coderoad && npm install
levels:
  - id: '1'
    steps:
      - id: '1.1'
```

We'll look more into config later, but for now just understand that its setting up a particular test runner (Mocha.js) in the `.coderoad` directory of the project. The code will run a specified repo and branch, and the environment it runs on should at least have Node version 10 or later.

Also note that the level & step IDs need to match up with the IDs in the `TUTORIAL.md` file.

### 3. Branches

CodeRoad uses GitHub like a server. Configuration code is kept on the master branch, and code is kept on versioned branches.

```text
~master
    - TUTORIAL.md
    - coderoad.yaml
    - tutorial.json
    - .gitignore
~v0.1.0
    ...code
~v0.2.0
    ...code
```

We keep versions on branches to avoid breaking changes. A user who started a tutorial earlier may still be continuing earlier progress.

### 4. Code

The first commit for a tutorial should setup the test runner, otherwise nothing will work.

CodeRoad has certain rules for commit names. These names are used by the build script for pulling in commit hashes for the tutorial.json.

See [an example code branch](https://github.com/coderoad/fcc-learn-npm/commits/v0.4.1), and note how each commit name is formatted in a specific way.

1. INIT
   - basic project setup code
   - add test runner dependencies
   - .vscode workspace configurations
2. 1.1
   - add tests
   - add testing dependencies
   - add scaffolding code (if needed)
3. 1.1S
   - the code required to make the tests pass

If you run into an issue and need to rename a commit, read [how to change a commit message](https://docs.github.com/en/github/committing-changes-to-your-project/changing-a-commit-message).

What makes CodeRoad work is the tests and solutions.

### 5. Build CLI

When a tutorial is ready for testing, you can run the [coderoad-cli](https://github.com/coderoad/coderoad-cli) to put everything together.

Run `coderoad build` to produce the `tutorial.json` file, then load that file into your CodeRoad extension. There is an option to load from files on the select tutorial page.

### Conclusion

For more, see [create a practice tutorial](/docs/create-a-practice-tutorial)
