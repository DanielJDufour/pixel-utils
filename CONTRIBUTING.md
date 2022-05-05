### useful abbreviations
- ct: count
- n: number
- px: pixel
- RGB: Red, Green, Blue
- RGBA: Red, Green, Blue, Alpha

### adding a function
- create a new folder in src
- add an index.ts file, which exports the function as a default
- if your function has to call other dependent functions, create each of those functions in a separate file for each one
- create a test.ts file, using [flug](https://github.com/danieljdufour/flug) create a test for each function