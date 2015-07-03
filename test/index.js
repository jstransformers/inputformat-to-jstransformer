var test = require('testit')
var assert = require('assert')
var inputFormatToTransformer = require('..')
var jstransformer = require('jstransformer')

test('should process on "md"', function() {
  var transform = inputFormatToTransformer('md')
  var md = jstransformer(transform)
  var output = md.render('# Hello World!').body
  assert.equal(output, '<h1>Hello World!</h1>');
})

test('should return null when not found', function() {
  var transform = inputFormatToTransformer('no-input-format-found')
  assert.equal(transform, null)
})
