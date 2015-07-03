'use strict'

var list = require('list-of-jstransformers')
var jstransformer = require('jstransformer')
var lazyRequire = require('lazy-require')
var fs = require('fs')

var dictionary = {}

for (var i in list) {
  var name = list[i]
  console.log(name)
  // Install and load the package.
  var transformer = lazyRequire('jstransformer-' + name)
  if (transformer instanceof Error ) {
    console.log('- Failed to load ' + name)
    continue
  }

  // Load the input formats for the transformer.
  var inputFormats = transformer.inputFormats ? transformer.inputFormats : [name]
  console.log(inputFormats)

  for (var n in inputFormats) {
    // Ensure the input format exists in the dictionary.
    if (!dictionary[inputFormats[n]]) {
      dictionary[inputFormats[n]] = []
    }

    // Add the package to the input format.
    dictionary[inputFormats[n]].push('jstransformer-' + name)
  }
}

fs.writeFileSync('dictionary.json', JSON.stringify(dictionary, null, 2))
