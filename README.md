# coderoad-vscode README

## Features

CodeRoad allows you to play interactive coding tutorials in your editor.

## Requirements

Requires:

- VSCode 1.40+
- Git
- Node 10+

## Development

Run the postgres db and api server.

Setup the extension environmental variables.

/src/.env

```
LOG=true #show hide debugging logs
```

Setup the web app environmental variables.

/web-app/.env.local

```
REACT_APP_DEBUG=true # show/hide web debugger
REACT_APP_GQL_URI=http://localhost:4000/graphql
REACT_APP_GQL_AUTH_TOKEN={YOUR_API_AUTH_TOKEN}
```

Run `npm run build`. Press F5 to open a new development window.

Open the tutorial using `cmd+shift+p` on mac, and select the action `coderoad.start`.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `coderoad.start`: starts the extension

## Supported Programming Languages

To support a new programming language, the test runner needs to support a format called TAP (https://testanything.org/).

Some test frameworks can be modified to use tap, see a list of TAP reporters: https://github.com/sindresorhus/awesome-tap#reporters.

### JavaScript

##### Jest

```json
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest-tap-reporter": "1.9.0"
  },
  "jest": {
    "reporters": ["jest-tap-reporter"]
  }
}
```

## Known Issues

There are no known issues at this time.
