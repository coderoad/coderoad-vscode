---
id: init-commit
title: Initial Commit
sidebar_label: Init Commit
---

Include basic setup for your project.

The first commit requires some necessary setup. See [an example init commit](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/c722f9e9ec8f94d7fba04cfa3375e0896346ced0).

A JS project should include:

- **.gitignore** - ignore any meta files, like `package-lock.json` or they may cause merge conflicts
- **.vscode/extensions** - would recommend “dbaeumer.vscode-eslint”
- **.vscode/launch.json** - file for running the debugger
- **.vscode/settings.json** - ensure that `formatOnSave` and linting are enabled
- **README.md**
- **package.json** - include test commands - include repo - include test runner dependencies

If starting a project with React, bear in mind that create-react-app runs some pretty hacky processes behind the scenes. You can use the following boilerplate in your project: [init with coderoad react tutorial starter · ShMcK/coderoad-tutorial-tweeter@059e004 · GitHub](https://github.com/ShMcK/coderoad-tutorial-tweeter/commit/059e0041691f39e3bf078022512d01a93214b6bb)
