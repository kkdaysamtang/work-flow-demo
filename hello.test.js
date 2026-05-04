const test = require('node:test');
const assert = require('node:assert');
const { greet, placeholder } = require('./hello');

test('greet returns "Hello, world!" for "world"', () => {
  assert.strictEqual(greet('world'), 'Hello, world!');
});

test('greet substitutes the name argument', () => {
  assert.strictEqual(greet('Alice'), 'Hello, Alice!');
});

test('placeholder export is preserved', () => {
  assert.strictEqual(placeholder(), 'placeholder');
});
