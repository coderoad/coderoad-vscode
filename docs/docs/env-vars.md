---
id: env-vars
title: Environment Variables
sidebar_label: Env Variables
---

## Variables

CodeRoad has a number of configurations:

- `CODEROAD_DISPLAY_RUN_TEST_BUTTON` - show the "Run" button on the tutorial page. Defaults `true`.

- `CODEROAD_DISABLE_RUN_ON_SAVE` - stop running tests whenever a file is saved. Defaults `false`.

- `CODEROAD_TUTORIAL_URL` - pass in a url path to a `tutorial.json` file. The tutorial will launch on startup. This is a way to create one-click tutorial experiences for web or locally. Defaults `null`.

- `CODEROAD_ADMIN_MODE` - a mode for tutorial developers. Under the "Review" page, you can jump around between levels & steps to test development. Defaults `false`.

- `CODEROAD_CONTENT_SECURITY_POLICY_EXEMPTIONS` - a list of CSP exemption hashes. For multiples, separate the list with a space.

- `CODEROAD_WEBHOOK_TOKEN` - an optional token for authenticating/authorizing webhook endpoints. Passed to the webhook endpoint in a `CodeRoad-User-Token` header.

## How to Use Variables

### Local

Launch the code editor with the environmental variables.

```shell
CODEROAD_ADMIN_MODE=true code .
```

Note that this requires the [VSCode CLI](https://code.visualstudio.com/docs/editor/command-line).

### Web / Virtual Machine

VSCode can be run in a browser in a variety of ways:

- [Code Server](https://github.com/cdr/code-server)
- [Codespaces](https://visualstudio.microsoft.com/services/visual-studio-codespaces/)

Read the docs for info on how to pass in variables, or contact `coderoadapp@gmail.com` for a working example.
