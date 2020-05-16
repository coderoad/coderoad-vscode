---
id: markdown
title: Markdown
sidebar_label: Markdown
---

The markdown is the meta data that pulls the tutorial together.

### Example

See a rough example below:

```md
# Tutorial Title

> Tutorial summary description

\`\`\`config
config:
testRunner:
command: command to run tests
fileFormats: - fileType (eg. JS, TS, etc)
repo:
uri: https://path/to/repo
branch: git-branch
\`\`\`

## Level Name

> Level summary description

Level content in a paragraph. The text that appears when you load a level.

### Step Name

\`\`\`config
setup:
files: - file-to-open.js
commits: - 'setup-commit-hash'
commands: - command to run
watchers: - files to watch and run tests if they change
solution:
files: - file-to-open.js
commits: - 'solution-commit-hash'
\`\`\`

Text to describe the step.
```

### Format

From a hierarchy perspective, a tutorial is made up of levels, which are made up of steps. When each level or step is loaded, if a config is provided, it will run in the extension.

Level

- Optional level setup config
- Steps
  - Step setup config
  - Step solution config

### Parser

Markdown is parsed by a CLI script and converted into JSON. The JSON is loaded as the core of the tutorial.
