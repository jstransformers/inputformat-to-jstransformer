const assert = require('assert')
const jstransformer = require('jstransformer')
const test = require('testit')
const inputFormatToTransformer = require('..')

test('should process on "md"', () => {
  const transform = inputFormatToTransformer('md')
  const md = jstransformer(transform)
  const output = md.render('**Hello World!**').body.trim()
  assert.equal(output, '<p><strong>Hello World!</strong></p>')
})

test('should return false when not found', () => {
  const transform = inputFormatToTransformer('no-input-format-found')
  assert.equal(transform, false)
})

test('should retrieve the dictionary', () => {
  assert.equal(inputFormatToTransformer.dictionary.babel[0], 'jstransformer-babel')
})
