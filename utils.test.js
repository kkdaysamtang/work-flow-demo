const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { capitalize, slugify } = require('./utils');

describe('capitalize', () => {
  it('capitalizes the first letter of a lowercase word', () => {
    assert.equal(capitalize('hello'), 'Hello');
  });

  it('leaves an already-capitalized word unchanged', () => {
    assert.equal(capitalize('World'), 'World');
  });

  it('handles a single character', () => {
    assert.equal(capitalize('a'), 'A');
  });

  it('returns an empty string when given an empty string', () => {
    assert.equal(capitalize(''), '');
  });
});

describe('slugify', () => {
  it('converts spaces to hyphens and lowercases', () => {
    assert.equal(slugify('Hello World'), 'hello-world');
  });

  it('removes special characters', () => {
    assert.equal(slugify('Hello, World!'), 'hello-world');
  });

  it('collapses multiple spaces into a single hyphen', () => {
    assert.equal(slugify('foo   bar'), 'foo-bar');
  });

  it('trims leading and trailing whitespace', () => {
    assert.equal(slugify('  padded  '), 'padded');
  });

  it('preserves digits', () => {
    assert.equal(slugify('Top 10 Picks'), 'top-10-picks');
  });
});
