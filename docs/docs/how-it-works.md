---
id: how-coderoad-works
title: How CodeRoad Works
sidebar_label: How CodeRoad Works
---

### Running Tests

In CodeRoad, the user is given a set of directions for a **task**.

Each task is judged to pass (✔) or fail (✘) by the result of code tests that runs in the background. Tests can be triggered by saving a file, or by a trigger that listens to specific files for changes.

![Test Flow Diagram](../images/test-flow-diagram.png)

If a test fails, the first failing test name is returned to the user as a hint to identify the problem.

Tests might be in another directory. Those folders or files might even be hidden from you by the tutorial creator.

But where does the code for these tests come from?
