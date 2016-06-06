'use strict';

var list = require('list-of-jstransformers');
var fs = require('fs');
var sortJson = require('sort-json');
var npm = require('npm');

var modules = []
for (var i in list) {
  modules.push('jstransformer-' + list[i]);
}

// Install and load the package.
npm.load(function (err) {
  // Set up logging.
  npm.on('log', console.log);

  npm.commands.install(modules, function (err, data) {
    if (err) {
      throw new Error(err)
    }
    var dictionary = {}
    for (var i in list) {
      var name = list[i]
      var transformer = require('jstransformer-' + name);
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
  })
})
