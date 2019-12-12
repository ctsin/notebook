https://morioh.com/p/ec9e5e4b6090

# Install ESLint and initialization

Install ESLint as dev dependency
```sh
npm install eslint --save-dev

# Next we initialise ESLint for our project:
./node_modules/.bin/eslint --init 
# Or
npx eslint --init
```

Install the config and plugins
**For React projects**
- babel-eslint
- eslint-config-airbnb
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-react

**For non react projects**
- babel-eslint
- eslint-config-airbnb-base
- eslint-plugin-import

Edit the `.eslintrc`
```json
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "jest": true
  },
  "plugins": ["react"],
  "rules": {}
}

```

# Install Prettier
Install the config and plugin
```sh
eslint-config-prettier
eslint-plugin-prettier
```

Update the `.eslintrc`
```json
"extends": ["airbnb", "plugin:prettier/recommended"]
```

Up to this point, the console will output the errors and warnings when ESLint and Prettier are executed in command line.

The more convenient way is using the IDE extension.
- [ESLint](https://on.morioh.net/b0a3f595aa?r=https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Visual Studio Marketplace
- [Prettier](https://on.morioh.net/b0a3f595aa?r=https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatter - Visual Studio Marketplace

Working well with VS Code `editor.formatOnSave: true`
