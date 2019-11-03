# coderoad-vscode README

## Features

CodeRoad allows you to play interactive coding tutorials in your editor.

## Requirements

Requires:

- VSCode 1.34+
- Git
- Node 10+

## Development

Run the postgres db and api server.

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

## Support New Programming Languages

In order to get the extension to support a new language, you'll need the following:

1. Test runner and CLI command to run test runner
2. Parser for test runner output (eg. TAP, JSON) that can determine if tests passed or return the failure message
3. Load prism markdown highlighting styles

TODO: A simple way to package all three together would be ideal.

## Known Issues

There are no known issues at this time.
