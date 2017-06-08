'use strict'

const fs = require('fs')
const list = require('list-of-jstransformers')
const sortJson = require('sort-json')
const npm = require('npm')

// Construct a list of transformers to ignore.
const ignore = [
  'mathjax',
  'move'
]

// Remove the ignored from the list to process.
for (const ignoreIndex in ignore) {
  if (ignore[ignoreIndex]) {
    list.splice(list.indexOf(ignore[ignoreIndex]), 1)
  }
}

// Put together a list of JSTransformer names.
const modules = []
for (const i in list) {
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
  const dictionary = {}
  for (const i in list) {
    if (list[i]) {
      const name = list[i]
      const transformer = require('jstransformer-' + name) // eslint-disable-line import/no-dynamic-require
      const formats = transformer.inputFormats || [name]

      for (const n in formats) {
        if (formats[n]) {
          const format = formats[n]
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
  const sorted = sortJson(dictionary)
  fs.writeFileSync('dictionary.json', JSON.stringify(sorted, null, 2))
}

// Install and load the package.
npm.load(err => {
  if (err) {
    throw err
  }

  // Set up logging.
  npm.on('log', console.log)

  npm.commands.install(modules, finishedInstall)
})
