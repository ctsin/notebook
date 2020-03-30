https://www.smashingmagazine.com/make-life-easier-when-using-git/

# To sort branches by commit date
git branch --sort=-committerdate

# Checkout previous branch
git checkout -

# Checkout branch N number of checkouts ago
git checkout @{-N}

# List branches along with commit ID, commit message and remote
git branch -vv

git checkout feature/my-other-branch -- thefile.txt


# Usually we would use git status to check what files have changed
git status

# Outputs:
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    another-file
    my-new-file

# Using the flags -sb we can shorten the output
git status -sb

# Outputs:
## master
 M README.md
?? another-file
?? my-new-file

# See the reference log of your activity
git reflog --all

# Look at the HEAD at given point from reflog
git show HEAD@{2}

# Checkout the HEAD, to get back to that point
git checkout HEAD@{2}

# This will find any change that was staged but is not attached to the git tree
git fsck --lost-found

# See the dates of the files
ls -lah .git/lost-found/other/

# Copy the relevant files to where you want them, for example:
cp .git/lost-found/other/73f60804ac20d5e417783a324517eba600976d30 index.html


# This will let you configure line-endings on an individual basis
git config core.eol lf
git config core.autocrlf input

# Adding this to your .gitattributes file will make it so all files
# are checked in using UNIX line endings while letting anyone on the team
# edit files using their local operating system’s default line endings. 
* text=auto

*.asset linguist-generated

# By using -- for a specific file,
# git log can find logs for files that were deleted in past commits
git log -- missing_file.txt

# This sets the commit template to the file given,
# this needs to be run for each contributor to the repository.
git config commit.template ./template-file

# Begin the bisect
git bisect start

# Tell git which commit does not have the bug
git bisect good c5ba734

# Tell git which commit does have the bug
git bisect bad 6c093f4

# Here, do your test for the bug.
# This could be running a script, doing a journey on a website, unit test etc.

# If the current commit has bug:
git bisect bad

# If the current commit does not have the bug
git bisect good

# This will repeat until it finds the first commit with the bug
# To exit the bisect, either:

# Go back to original branch:
git bisect reset

# Or stick with current HEAD
git bisect reset HEAD

# Or you can exit the bisect at a specific commit
git bisect reset <commit ID>

# Begin the bisect
git bisect start

# Tell git which commit does not have the bug
git bisect good c5ba734

# Tell git which commit does have the bug
git bisect bad 6c093f4

# Tell git to run a specific script on each commit
# For example you could run a specific script:
git bisect run ./test-bug

# Or use a test runner
git bisect run jest

# This will run for every commit between current and the given commit ID
git rebase -i --exec ./my-script 

