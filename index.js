'use strict';

var dictionary = require('./dictionary.json');
var requireOne = require('require-one');

/**
 * Load the first available JSTransformer from the given input format.
 *
 * @return The transformer; false otherwise.
 */
module.exports = function inputFormatToJsTransformer (inputFormat) {
  if (inputFormat in dictionary) {
    // Attempt to load one of the packages from the dictionary.
    try {
      return requireOne(dictionary[inputFormat]);
    } catch (e) {
      return false;
    }
  }
  return false;
};

module.exports.dictionary = dictionary;
