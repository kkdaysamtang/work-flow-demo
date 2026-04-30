const { test } = require('node:test');
const assert = require('node:assert');
const { greet } = require('./hello');

test("greet('world') returns 'Hello, world!'", () => {
  assert.strictEqual(greet('world'), 'Hello, world!');
});
