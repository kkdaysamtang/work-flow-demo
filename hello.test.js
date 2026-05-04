const test = require('node:test');
const assert = require('node:assert/strict');
const { greet, placeholder } = require('./hello');

test("greet('world') returns 'Hello, world!'", () => {
  assert.equal(greet('world'), 'Hello, world!');
});

test('placeholder() still returns "placeholder"', () => {
  assert.equal(placeholder(), 'placeholder');
});
