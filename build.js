'use strict';

var list = require('list-of-jstransformers');
var lazyRequire = require('lazy-require');
var fs = require('fs');
var sortJson = require('sort-json');

var dictionary = {};

for (var i in list) {
  var name = list[i];
  console.log(name);
  // Install and load the package.
  var transformer = lazyRequire('jstransformer-' + name);
  var formats = transformer.inputFormats || [name];
  for (var n in formats) {
    var format = formats[n];
    // Ensure the input format exists in the dictionary.
    if (!dictionary[format]) {
      dictionary[format] = [];
    }

    // Add the package to the input format.
    dictionary[format].push('jstransformer-' + name);
  }
}

var sorted = sortJson(dictionary);
fs.writeFileSync('dictionary.json', JSON.stringify(sorted, null, 2));
