# Chrome ProTips
Chrome can print live expression on Console
[Live Demostration](https://twitter.com/i/status/1201219613779869696)

# Faster app with JSON.parse()
https://www.youtube.com/watch?v=ff4fgQxPaO0

Why the JSON.parse() is faster than JavaScript literal?
- JSON.parse accept string only, JS literal will consider the types.
- Different on how to deal with `{`. In parse(), `{` neans aN object ONLY. But JS need work much harder to guess if it's other syntax.

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
