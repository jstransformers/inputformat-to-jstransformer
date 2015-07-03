# inputformat-to-jstransformer

Load the first available JSTransformer from the provided `inputFormat`.

[![Build Status](https://img.shields.io/travis/jstransformers/list-of-jstransformers/master.svg)](https://travis-ci.org/jstransformers/list-of-jstransformers)
[![NPM version](https://img.shields.io/npm/v/list-of-jstransformers.svg)](https://www.npmjs.org/package/list-of-jstransformers)

## Installation

    npm install inputformat-to-jstransformer

## API

Returns the first package available to process the given input format. Will return `null` if no package is available to process the given input format.

```js
var jstransformer = require('jstransformer')
var inputFormatToTransformer = require('inputformat-to-jstransformer')

var md = inputFormatToTransformer('md')
// => remarkable, markdown, markdown-it, marko, or supermarked

var md = jstransformer(md).render('# Hello World!').body
// => '<h1>Hello World!</h1>'
```

See [`dictionary.json`](dictionary.json) for a better idea of how this is done.

## Update

To update `dictionary.json`, run:
  ```
  npm run build
  ```

## License

MIT
