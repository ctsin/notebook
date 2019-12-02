# npm Commands and Features You Should Know
https://alligator.io/nodejs/npm-commands-you-should-know

# Let npm Do the Work

```sh
NOT Clear yet 🤔
$ npm completion >> ~/.bashrc
```
# Learn About Your Packages

```sh
$ npm view react
$ npm repo webpack
$ npm docs react
```

# Shorthands and Flags
```sh
npm i - install
npm t - test
npm it - install and run tests
npm ci - clean-install
npm cit - clean-install and run tests

npm init -y
npm install -D - the flag is short for --save-dev
npm install -E - the flag is short for --save-exact
```

# Versioning and Publishing
```sh
$ npm version patch
$ npm version premajor --preid alpha

$ npm pack

# You can actually install straight from a local tarball to see what you get.
$ npm i my-awesome-package-1.0.0.tgz

#Any version published with the above command will be installable with npm i <package>@next.
$ npm publish --tag next

$ npm deprecate my-awesome-package@1.0.0 "please use 1.0.1"
```

# Bonus Utilities
```sh
$ npm prefix -g
$ npm bin -g
$ npm root -g
```
