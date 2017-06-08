'use strict'

const requireOne = require('require-one')
const dictionary = require('./dictionary.json')

/**
 * Load the first available JSTransformer from the given input format.
 *
 * @return The transformer; false otherwise.
 */
module.exports = function (inputFormat) {
  if (inputFormat in dictionary) {
    // Attempt to load one of the packages from the dictionary.
    try {
      return requireOne(dictionary[inputFormat])
    } catch (err) {
      return false
    }
  }
  return false
}

module.exports.dictionary = dictionary
