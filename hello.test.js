const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { multiply } = require('./hello');

describe('multiply', () => {
  it('returns product of two positive numbers', () => {
    assert.equal(multiply(3, 4), 12);
  });

  it('returns 0 when one argument is 0', () => {
    assert.equal(multiply(5, 0), 0);
  });

  it('handles negative numbers', () => {
    assert.equal(multiply(-2, 3), -6);
  });
});
