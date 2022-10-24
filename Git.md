# Cherry-pick

```sh
# commit ID in source branch: 10001 10002

# in target branch
git cherry-pick 10001 10002

# cherry pick without committing
git cherry-pick 10001 -n # --no-commit
```

# Add-exclude-files

https://stackoverflow.com/a/51914162

Git supports exclude certain paths and files by pathspec magic `:(exclude)` and its short form `:!`. 
So you can easily achieve it as the following command.

```sh
git add --all -- :!main/dontcheckmein.txt
git add -- . :!main/dontcheckmein.txt
```

Actually you can specify more:

```sh
git add --all -- :!path/to/file1 :!path/to/file2 :!path/to/folder1/*
git add -- . :!path/to/file1 :!path/to/file2 :!path/to/folder1/*
```

# Delete multiple branches

https://stackoverflow.com/a/47304256

```sh
// ❤
git branch -d `git branch --list '3.2.*'`

OR
// https://stackoverflow.com/a/3670479
git branch -D `git branch | grep -E '^3\.2\..*'`
```

# Some commands

```sh
git pull --rebase origin/dev
git checkout -b BRANCH_NAME --no-track origin/dev
git push --force-with-lease origin dev
```

# Reset

https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified

|Tree|Role|
|-:|-|
|HEAD|Last commit snapshot, next parent|
|Index|Proposed next commit snapshot|
|Working Directory|Sandbox|

![reset soft](https://git-scm.com/book/en/v2/images/reset-soft.png)

![reset mix - default](https://git-scm.com/book/en/v2/images/reset-mixed.png)

![reset hard - dangerous](https://git-scm.com/book/en/v2/images/reset-hard.png)

**Recap**

The reset command overwrites these three trees in a specific order, stopping when you tell it to:

1. Move the branch HEAD points to (stop here if --soft).
1. Make the index look like HEAD (stop here unless --hard).
1. Make the working directory look like the index.

**Reset With a Path**

1. Move the branch HEAD points to (skipped).
1. Make the index look like HEAD (stop here).

`checkout` with a path is similar to `reset` with a path, BUT it will overwrite the working directory.

**Squashing**

![squashing commits](https://git-scm.com/book/en/v2/images/reset-squash-r3.png)