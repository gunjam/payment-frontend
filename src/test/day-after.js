'use strict';

const {expect} = require('chai');
const {dayAfter} = require('../lib/generate-bsp-schedule');

describe('dayAfter()', () => {
  it('should return the date one day after input date', () => {
    const date = new Date('2016-09-20');
    const nextDate = new Date('2016-09-21');
    const output = dayAfter(date);
    expect(output).to.deep.equal(nextDate);
  });
  it('should return correct date when the input is end of the month', () => {
    const date = new Date('2016-09-30');
    const nextDate = new Date('2016-10-01');
    const output = dayAfter(date);
    expect(output).to.deep.equal(nextDate);
  });
});
