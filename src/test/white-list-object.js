'use strict';

const {expect} = require('chai');
const whiteListObject = require('../utils/white-list-object');

describe('whiteListObject()', () => {
  it('should return an object with only properties specificied', () => {
    const object = {a: 'a', b: 'b', c: 'c', d: 'd'};
    const expectedObject = {a: 'a', c: 'c'};
    const output = whiteListObject(object, ['a', 'c']);
    expect(output).to.deep.equal(expectedObject);
  });

  it('should return an object including missing properties as empty strings', () => {
    const object = {a: 'a', c: 'c'};
    const expectedObject = {a: 'a', b: '', c: 'c', d: ''};
    const output = whiteListObject(object, ['a', 'b', 'c', 'd']);
    expect(output).to.deep.equal(expectedObject);
  });

  it('should return an empty object if no properties are specified', () => {
    const object = {a: 'a', b: 'b', c: 'c', d: 'd'};
    const expectedObject = {};
    const output = whiteListObject(object);
    expect(output).to.deep.equal(expectedObject);
  });

  it('should return an equivolent object if object properties match specified list', () => {
    const object = {a: 'a', b: 'b', c: 'c', d: 'd'};
    const output = whiteListObject(object, ['a', 'b', 'c', 'd']);
    expect(output).to.deep.equal(object);
  });
});
