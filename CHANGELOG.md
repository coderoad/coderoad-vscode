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
        "version": ">5"
      }
    ]
  }
}
```

## [0.2.2]

- Fixes issue where app fails on startup without a workspace, and instead returns an error page

## [0.2.3]

- Support Windows OS
