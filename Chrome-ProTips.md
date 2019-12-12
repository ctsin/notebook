Chrome can print live expression on Console
[Live Demostration](https://twitter.com/i/status/1201219613779869696)

# Faster app with JSON.parse()
https://www.youtube.com/watch?v=ff4fgQxPaO0

Why the JSON.parse() is faster than JavaScript literal?
- JSON.parse accept string only, JS literal will consider the types.
- Different on how to deal with `{`. In parse(), `{` neans aN object ONLY. But JS need work much harder to guess if it's other syntax.
