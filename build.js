'use strict'

var fs = require('fs')
var list = require('list-of-jstransformers')
var sortJson = require('sort-json')
var npm = require('npm')

// Construct a list of transformers to ignore.
var ignore = [
  'mathjax',
  'move'
]

// Remove the ignored from the list to process.
for (var ignoreIndex in ignore) {
  if (ignore[ignoreIndex]) {
    list.splice(list.indexOf(ignore[ignoreIndex]), 1)
  }
}

// Put together a list of JSTransformer names.
var modules = []
for (var i in list) {
  if (list[i]) {
    modules.push('jstransformer-' + list[i])
  }
}

/**
 * Write the dictionary.json based on the installed modules.
 */
function finishedInstall(err) {
  if (err) {
    throw new Error(err)
  }
  var dictionary = {}
  for (var i in list) {
    if (list[i]) {
      var name = list[i]
      var transformer = require('jstransformer-' + name) // eslint-disable-line import/no-dynamic-require
      var formats = transformer.inputFormats || [name]

      for (var n in formats) {
        if (formats[n]) {
          var format = formats[n]
          // Ensure the input format exists in the dictionary.
          if (!dictionary[format]) {
            dictionary[format] = []
          }

          // Add the package to the input format.
          dictionary[format].push('jstransformer-' + name)
        }
      }
    }
  }
  var sorted = sortJson(dictionary)
  fs.writeFileSync('dictionary.json', JSON.stringify(sorted, null, 2))
}

// Install and load the package.
npm.load(function (err) {
  if (err) {
    throw err
  }

  // Set up logging.
  npm.on('log', console.log)

  npm.commands.install(modules, finishedInstall)
})
