'use strict'

var dictionary = require('./dictionary.json')
var requireOne = require('require-one')

/**
 * Load the first available JSTransformer from the given input format.
 */
module.exports = function inputFormatToJsTransformer (inputFormat) {
  if (dictionary[inputFormat]) {
    // Attempt to load one of the packages from the dictionary.
    try {
      return requireOne(dictionary[inputFormat])
    } catch (e) {
      return null
    }
  }
}

module.exports.dictionary = dictionary
