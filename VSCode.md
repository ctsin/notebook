Ctl + Opt + up/down => change property’s position in JSX/TSX

```json
{
  "key": "alt+cmd+backspace",
  "command": "editor.action.removeBrackets",
  "when": "editorTextFocus"
}
{
  "key": "alt+cmd+.",
  "command": "editor.action.autoFix",
  "when": "textInputFocus && !editorReadonly && supportedCodeAction =~ /(\\s|^)quickfix\\b/"
}

{
  "key": "cmd+.",
  "command": "editor.action.quickFix",
  "when": "editorHasCodeActionsProvider && textInputFocus && !editorReadonly"
}

{
  "key": "cmd+.",
  "command": "workbench.action.terminal.showQuickFixes",
  "when": "terminalFocus"
}

{
  "key": "ctrl+q",
  "command": "workbench.action.quickOpenView"
}
```
# Install `code` in MacOS `PATH` environment variable

<kbd>cmd + shift + P</kbd>Type `Shell Command: Install 'code' command in PATH` and select it.

# Amazon Q issue

Error: "unable to get local issuer certificate"

Go to Settings → search "http.proxyStrictSSL" → set to false