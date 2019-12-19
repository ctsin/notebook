https://stackoverflow.com/a/51914162

Git supports exclude certain paths and files by pathspec magic :(exclude) and its short form :!. 
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
