---
id: test-runner
title: Test Runner
sidebar_label: Test Runner
---

### Test Runner

Test output is parsed by the test runner to see if tests have passed or failed.

Currently, it’s required that the test runner produce “TAP” output: [Home - Test Anything Protocol](https://testanything.org/). Why? Every test runner produces different output, and for now it’s easier to use a pre-existing standard available for most test runners rather than to write output parsers for every test runner. See a list of common tap producers: [TAP Producers - Test Anything Protocol](https://testanything.org/producers.html).

CodeRoad can run with any kind of testing tool (eg. unit, integration, E2E). More complex tests can take longer and may frustrate users. Whenever possible, try to choose a test runner that is lightweight and performant.
