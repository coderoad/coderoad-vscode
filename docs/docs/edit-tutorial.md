---
id: edit-tutorial
title: Editing a Tutorial
sidebar_label: Editing a Tutorial
---

Once you've created a tutorial, you'll need a way to version and update new releases.

Tutorials are made of two parts: Markdown & Git commits.

### 1. Editing Markdown

When editing markdown, simply edit the markdown and re-run the builder.

### 2. Editing Git Commits

Editing Git commits is a bit harder, and involves a part of Git called an "interactive rebase".

1. Create a new branch and give it a versioned named, like "v0.2". It's important to create a new branch as we will be changing the git commit history.

```shell
git checkout -b v0.2
```

2. Start an interactive rebase.

When editing code, you'll need to rebase. You can use VSCode as your default editor for Git: <https://blog.soltysiak.it/en/2017/01/set-visual-studio-code-as-default-git-editor-and-diff-tool/.>

Run rebase starting at a commit target, or just from the start with `--root`.

```shell
git rebase -i --root
```

### Editing A Commit

Choose the commit you want to edit

```text
pick b73feaf INIT
pick 0a3aa83 1.1
pick 0d67935 2.1
```

Let's say we want to edit step `1.1` Change the word pick to "edit" or "e"

```text
e 0a3aa83 1.1
```

Save the modified rebase summary file and your rebase will start. Git will run through the commits until the first flagged "edit", then stop at the commit.

Make the file changes you planned, then "add" your changes to git.

To complete rebasing:

```shell
git rebase --continue
```

If you encounter any merge conflicts along the way, resolve them, add the changes and continue as above.

### Adding Additional Commits

Let's say we wanted to add an additional commit after the `1.1`.

```text
pick b73feaf INIT
pick 0a3aa83 1.1
pick 0d67935 2.1
```

To cause the rebase to pause after a commit, use the word "break" or "b".

```text
pick b73feaf INIT
pick 0a3aa83 1.1
break
pick 0d67935 2.1
```

Save the rebase summary file to start the process. The process should stop at the "break".

Add the commits you want, and when you finish continue:

```shell
git rebase --continue
```

If you encounter any merge conflicts along the way, resolve them, add the changes and continue as documented in the "editing a commit" section.

### Rewording a Commit

Let's say we wanted to change the title of commit "2.1" to "1.2".

```text
pick b73feaf INIT
pick 0a3aa83 1.1
pick 0d67935 2.1
```

You can use the "reword" or "r" method.

```text
pick b73feaf INIT
pick 0a3aa83 1.1
reword 0d67935 2.1
```

When you're finished, just save the file and the commits will be updated.

### Oops! Something Went Wrong

Rebasing is a difficult skill to master, but you can get good at it with time. That said, time travelling is a complicated process and a lot can go wrong.

If something goes wrong during your rebase, you can abort by running:

```shell
git rebase --abort
```

It's best to only run rebase on new branches so that you'll always be able to get back to your last working version.
