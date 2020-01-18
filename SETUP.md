# Setup

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
```

Run `npm run build`. Press F5 to open a new development window.

Open the tutorial using `cmd+shift+p` on mac, and select the action `coderoad.start`.

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
