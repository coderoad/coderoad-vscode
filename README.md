# coderoad-vscode README

## Features

CodeRoad allows you to play interactive coding tutorials in your editor.

## Getting Started

### Launch

To start the extension, inside VSCode:

- Open the VSCode command palette.
  - select “View” > “Command Palette” from the top panel
  - alternatively, press `cmd/ctrl + shift + P`
- Search for and run `CodeRoad:Start`
- A web view should appear on the right side of your editor asking you to click "Start"

### Requirements

- VSCode 1.40+
- Git
- Node 10+

## Run

1. Open the command prompt: `cmd/ctrl + shift + p`
2. # Search for and run `coderoad:start`

### Installation

> Currently CodeRoad is not yet available in the VSCode marketplace (coming soon!).

To install the extension manually:

- run `vsce package` to build the package.
  Learn more about [VSCE](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- run `code —install-extension coderoad-0.1.0.vsix`.

## Creating a Tutorial

Build and share your own interactive tutorials.

Learn more about [how tutorials area created](./docs/tutorials.md).

## License

[AGPL v3](./LICENSE.md)
