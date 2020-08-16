---
id: hooks-actions
title: Hooks & Actions
sidebar_label: Hooks & Actions
---

To make a functional tutorial, tutorial creators need a bit more control over what can be run and when. For example, a test runner wouldn't really work if the package dependencies for that test runner weren't installed.

An action is a piece of functionality that can be run. These include:

- `commands` - a list of cli commands to run. For example, "npm install"
- `vscodeCommands` - a list of vscode API commands to run. For example, "setLayout" to change the layout of windows
- `watchers` - a list of files to listen to. If a file changes, the test runner will run automatically
- `files` - a list of files to open in the users workspace to drive the users attention.
- `subtasks` - a task made up of multiple other tests where all must pass to continue
- `filter` - a regex passed into the test runner to limit the tests returned

A hook in CodeRoad is a place where a tutorial creator can tap in to run an action. Hooks include:

- `config.setup` - when the tutorial setup. This is a great place to setup your test runner.
- `task.setup` - when a task is started
- `task.solution` - when a solution is loaded from a reset

Hooks and actions combine to provide a flexible environment for tutorial development.
