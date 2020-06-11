---
id: markdown
title: Markdown
sidebar_label: Markdown
---

The markdown file lives on the master branch and has a name of `TUTORIAL.md`. It describes the structure of a tutorial and contains all the lessons, their descriptions, and the text users will read.

### Example

See a rough example below:

```md
# Tutorial Title

> Tutorial introduction paragraph

## L1 Lesson 1

> Lesson 1 summary

Lesson 1 decription and instructions.

### L1S1 Lesson 1 Step 1

Test text for L1S1

#### HINTS

* This is a hint for L1S1
* This is another hint for L1S1

## L2 Lesson 2

> Lessons 2 summary

Lesson 2 content.

### L2S1 Lesson 2 Step 1

Test text

#### HINTS

* Hint for L2S1

### L2S2 Lesson 2 Step 2

Test text for L2S2

#### HINTS

* Hint for L2S2
```

#### Explanation

The example above has an introduction page and two lessons. 

The introduction page is first thing users will see when they start a tutorial. It shows an overview of all the lessons and displays the lesson summary.

Lessons need to start with `## Lx ` where `x` is the lesson number. The text after `Lx` will display as the lesson title. 

The "Steps", or test text, need to start with `LxSy` where `x` matches the lesson number and `y` is the number for a "step".