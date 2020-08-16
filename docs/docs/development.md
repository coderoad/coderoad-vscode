---
id: development
title: Development
sidebar_label: Development
---

## Feature Request

Post an issue. Let's chat.

## Development

To run the extension locally:

- copy environmental variables from `/web-app/.env.example` as `/web-app/.env`
- install dependencies with `yarn install-all`
- build the extension with `yarn build`
- open the extension with the vscode extension debugger by pressing F5. In the new window, open CodeRoad.

### Testing Builds

To test a packaged build locally:

- if on Mac, ensure you have [VSCode command line tools](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) installed
- run `yarn package`. It will build the extension and install it locally.
- open a new vscode window and launch the new version of CodeRoad
