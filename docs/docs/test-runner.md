---
id: test-runner
title: Test Runner
sidebar_label: Test Runner
---

### Test Runner

Test output is parsed by the test runner to see if tests have passed or failed.

Currently, it’s required that the test runner produce “TAP” output.: [Home - Test Anything Protocol](https://testanything.org/). Mostly because every test runner produces different output, and it’s easier to use a pre-existing standard available for most test runners rather than to write output parsers for every test runner. See a list of common tap producers: [TAP Producers - Test Anything Protocol](https://testanything.org/producers.html).

See an example using “Mocha” and the “Mocha Tap Reporter”:

```json
{
“scripts”: {
    “programmatic-test”: “mocha —reporter=mocha-tap-reporter”,
    “test”: “mocha”
  },
  “devDependencies”: {
    “mocha”: “^7.0.1”,
    “mocha-tap-reporter”: “^0.1.3”
  }
}
```

In this example, the extension can run `npm run programmatic-test` to run the tests as TAP, but the user can still run `npm run test` to see a more human readable output.

Ideally, try to choose a test runner that performs quickly. If possible, avoid Jest as it has slow install and running times.
