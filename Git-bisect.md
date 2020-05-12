https://dev.to/uraniumreza/debug-using-git-bisect-15c4

```sh
git bisect start

git bisect good <commit-hash>
git bisect bad <commit-hash>

git bisect good
git bisect bad

git bisect reset

git bisect reset <commit-hash>
git bisect reset bisect/bad # checkout the first bad revision
git bisect reset HEAD # leave us to the currect bisection commit
```
