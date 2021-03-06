---
id: hooks-actions
title: Hooks & Actions
sidebar_label: Hooks & Actions
---

To make a functional tutorial, tutorial creators need a bit more control over what can be run and when.

## Hooks

A hook in CodeRoad is a place where a tutorial can tap in to run an action. Hooks include:

- `config.setup` - when the tutorial setup. This is a great place to setup your test runner.
- `step.setup` - when a task is started
- `step.solution` - when a solution is loaded from a reset

Hooks and actions combine to provide a flexible environment for tutorial development.

To see which hooks run where, consult [the hooks list in the codebase](https://github.com/coderoad/coderoad-vscode/blob/master/src/services/hooks/index.ts).

## Actions

An action is a piece of functionality that can be run. These include:

### `commands` (string[])

A list of cli commands to run. For example, "npm install"

```yaml
setup:
  commands:
    - 'npm install'
```

In the example above, `npm install` will run in the root of the workspace.

### `vscodeCommands` (string[] | [command: string, params: any][])

A list of vscode API commands to run. Commands may be a single string, or an array with the command, and params.

```yaml
setup:
  vscodeCommands:
    - 'workbench.action.terminal.toggleTerminal' # toggle terminal
    - [
        'setEditorLayout',
        { orientation: 0, groups: [{ groups: [{}, {}], size: 0.5 }, { groups: [{}, {}], size: 0.5 }] },
      ] # set the orientation of windows and sizes
```

For example, "toggleTerminal" toggles the terminal, while "setLayout" changes the layout of windows.

There are a number of options in the VSCode API. More info at:

- [vscode commands API](https://code.visualstudio.com/api/references/vscode-api#commands)
- [commands with params](https://code.visualstudio.com/api/references/commands)
- [commands without params](https://code.visualstudio.com/docs/getstarted/keybindings)

### `watchers` (string[])

A list of files globs to listen to. If a file changes that matches the pattern, the test runner will run automatically.

```yaml
setup:
  watchers:
    - 'package.json'
    - 'node_modules/express'
```

The example above will run tests if the `package.json` file changes, or if there is a change in `node_modules/express`. This is a good way to run tests if a package is installed.

Note that watchers are throttled to run no more than once per second.

Read more about [glob patterns](https://code.visualstudio.com/api/references/vscode-api#GlobPattern).

### `files` (string[])

A list of files to open in the users workspace to drive the users attention.

```yaml
setup:
  files:
    - 'README.md'
```

The above example will open the "README.md" file in the users workspace. Note that file paths are relative to the workspace root.

### `filter` (string)

A glob passed into the test runner to limit the tests returned.

```yaml
setup:
  filter: 'tests/{level1, level2}/*'
```

Will restrict tests to only run a subset of tests that match the filter. Filter depends on your test runner, and can be configured in the test runner.

```yaml
config:
  testRunner:
    command: ./node_modules/.bin/mocha
    args:
      filter": --grep
```

Essentially, the above example will run `./node_modules/.bin/mocha --grep level_1_tests` as the test command.

### subtasks

A task made up of multiple other tests where all must pass to continue.

![subtask example](/gif/subtask-demo.gif)

See an [example](https://github.com/shmck/coderoad-tutorial-subtask-demo).

Subtasks do not require any config, but may be written in the TUTORIAL.md with corresponding test names.

##### 1. Add the subtask titles to the TUTORIAL.md

```md
## 1. Subtask Example

A subtask example

### 1.1

Create a function `add` that can take a variety of params.

#### SUBTASKS

- Add one number
- Add two numbers
- Add three numbers
```

##### 2. Label the tests with `:#`

As an example, the below test corresponds to the index of the first subtask ("Add one number").

```js
it(':1 should add one number', function () {
  const result = add(1) === 1
  const message = 'Should accept a single param'
  assert.ok(result, message)
  const result2 = add(42) === 42
  assert.ok(result2, message)
})
```

See [an example subtask test file](https://github.com/ShMcK/coderoad-tutorial-subtask-demo/blob/v0.2.1/.coderoad/test/add.test.js) for more.

The number of subtasks should match the number of tests being run. If this is not the case, use [filter](#filter-string) to limit the tests.
