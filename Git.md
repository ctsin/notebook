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
