var test = require('testit')
var assert = require('assert')
var inputFormatToTransformer = require('..')
var jstransformer = require('jstransformer')

test('should process on "md"', function () {
  var transform = inputFormatToTransformer('md')
  var md = jstransformer(transform)
  var output = md.render('**Hello World!**').body.trim()
  assert.equal(output, '<p><strong>Hello World!</strong></p>')
})

test('should return false when not found', function () {
  var transform = inputFormatToTransformer('no-input-format-found')
  assert.equal(transform, false)
})

test('should retrieve the dictionary', function () {
  assert.equal(inputFormatToTransformer.dictionary['babel'][0], 'jstransformer-babel')
})
