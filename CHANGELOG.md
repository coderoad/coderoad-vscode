# Change Log

All notable changes to the "coderoad-vscode" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.0]

- Initial release

## [0.2.0]

- Improvements to error handling
- Validate Git installed on startup
- Validate Git remote can connect on tutorial selection
- Fix component translation issues

## [0.2.1]

- Improves error page
- Adds tutorial dependency validation in tutorial config. See an example below:

```json
{
  "config": {
    "dependencies": [
      {
        "name": "node", // command line process to run
        "version": "^10", // see node-semver for options
        "message": "An optional message to display if the validation fails"
      },
      {
        "name": "npm",
        "version": ">=5"
      }
    ]
  }
}
```

## [0.2.2]

- Fixes issue where app fails on startup without a workspace, and instead returns an error page

## [0.2.3]

- Support Windows OS

## [0.2.4]

- Support VSCode 1.39.2

## [0.3.0]

- Validate the extension version against the tutorial config version. This should allow us to manage breaking changes in tutorial schema in upcoming versions. See [node-semver](https://github.com/npm/node-semver#advanced-range-syntax) for possible version ranges and options.

```json
{
"config": {
  "appVersions": {
    "vscode": ">=0.2"
  },
}
```

- Configure the CodeRoad to load and run in a different directory. The example below will:
  - load a commit and run npm install to setup the test runner in its own folder.
  - run "npm test" in the \$ROOT/coderoad directory on save

```json
{
"config": {
  "testRunner": {
    "command": "npm test", // runs in path location or root
    "path": "coderoad",
    "actions": {
      "commits": ["a974aea"],
      "commands": ["npm install"] // runs in path location or root
    }
  },
}
```

Resulting in a folder structure like the following:

```
- .vscode
- coderoad (test runner files only with their own setup)
  - package.json
  - tests
- package.json
- server.js
```

## [0.4.0]

- Want to look back at a previous lesson's content? Navigate through text content from previous levels by clicking the "Learn" dropdown.

![traverse content](./docs/images/traverse-content.png)

- Continue an incomplete tutorial started in the same workspace. Choose the "continue" path from the start screen. Progress is stored in local storage in the workspace.

![continue tutorial](./docs/images/continue-tutorial.png)

## [0.5.0]

- Show error messages in the webview UI

![fail message in webview](./docs/images/fail-message-in-webview.png)
