---
id: test-examples
title: Test Examples
sidebar_label: Test Examples
---

When writing a tutorial you'll find you need to write tests for a wide variety of scenarios. This section aims to provide examples and inspiration.

Integration tests are usable, but slower. Unit tests are fastest whenever possible.

That said, anything can be tested. I’ll include some examples below of tests I’ve made for inspiration.

### Equality

Testing equality
Eg. <https://github.com/ShMcK/coderoad-tutorial-js-bug-hunter/commit/75b32ebee89853deb3b4dad6aa8654f89bc72cff>

### Spy/Listener

Code that listens for something to have been called. Use a spy.
Eg. [1.2 console log · ShMcK/coderoad-fcc-basic-node-and-express@ec62e7b · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/ec62e7b2cd65173a503dc2bd6be71c46f66f7c25)

### Dependency Installed

Watch for a dependency to be installed.
Eg. [1.1 install express · ShMcK/coderoad-fcc-basic-node-and-express@9e28073 · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/9e28073eb238a5edd41470edc407a4bfe03ebf80)

### API Test

Code that calls an endpoint and validates the return.
Eg. [2.1 get root · ShMcK/coderoad-fcc-basic-node-and-express@b08cb17 · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/b08cb17822544ee957021c03e53eb57170c93231)

### File Creation

Check if a file exists.
Eg. [6.1 create .env · ShMcK/coderoad-fcc-basic-node-and-express@eaf4220 · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/eaf4220e6343de2c6bb0dda74e7c347f5e45b242)

### Regex Code

Run a regex matcher to find a code match. Code can expect to be formatted from the provided linter rules.
Eg. [11.2 body parser middleware · ShMcK/coderoad-fcc-basic-node-and-express@8b416dc · GitHub](https://github.com/ShMcK/coderoad-fcc-basic-node-and-express/commit/8b416dcc1e262310658083a4d40090846e257dd8)

### React

Test shallow renders with @testing-library/react.
Eg. [setup: working message form input · ShMcK/coderoad-tutorial-tweeter@1c248ff · GitHub](https://github.com/ShMcK/coderoad-tutorial-tweeter/commit/1c248ff9846c5a27c12a2cbbb77cab1d66613be4)
You can also test hooks with @testing-library/react-hooks
Eg. [setup: useText hook refactor · ShMcK/coderoad-tutorial-tweeter@71deafa · GitHub](https://github.com/ShMcK/coderoad-tutorial-tweeter/commit/71deafa34fb0c271e57fb1749df184c0df3bcd8b)

### Testing a Test 🤯

It's even possible to write tests for tests. The trick is to mock the solution, and run the tests. [Eg Test a Test](https://github.com/ShMcK/test-a-test)
