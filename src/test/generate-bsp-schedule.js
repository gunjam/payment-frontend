'use strict';

const {expect} = require('chai');
const generateBSPSchedule = require('../lib/generate-bsp-schedule');

const dateOfDeath = new Date('2017-04-08');
const dateOfPensionAge = new Date('2024-04-07');

describe('generateBSPSchedule()', () => {
  it('should start payment on the defined start date', () => {
    const dateOfClaim = new Date('2017-04-25');
    const startDate = new Date('2018-04-25');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false, startDate);
    expect(schedule).to.deep.equal([
      {amount: 2500, date: startDate},
      {amount: 100, date: new Date('2018-05-08')},
      {amount: 100, date: new Date('2018-06-08')},
      {amount: 100, date: new Date('2018-07-08')},
      {amount: 100, date: new Date('2018-08-08')},
      {amount: 100, date: new Date('2018-09-08')},
      {amount: 100, date: new Date('2018-10-08')},
      {amount: 100, date: new Date('2018-11-08')},
      {amount: 100, date: new Date('2018-12-08')},
      {amount: 100, date: new Date('2019-01-08')},
      {amount: 100, date: new Date('2019-02-08')},
      {amount: 100, date: new Date('2019-03-08')},
      {amount: 100, date: new Date('2019-04-08')},
      {amount: 100, date: new Date('2019-05-08')},
      {amount: 100, date: new Date('2019-06-08')},
      {amount: 100, date: new Date('2019-07-08')},
      {amount: 100, date: new Date('2019-08-08')},
      {amount: 100, date: new Date('2019-09-08')},
      {amount: 100, date: new Date('2019-10-08')}
    ]);
  });
  describe('standard rate', () => {
    it('should generate a full schedule if the claim is less than 1 month from the death', () => {
      const dateOfClaim = new Date('2017-04-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 1 monthly payment and pay for 17 months if the claim is 1 month after death', () => {
      const dateOfClaim = new Date('2017-05-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: dateOfClaim},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 2 months of payments and pay for 16 months if the claim is 2 months after death', () => {
      const dateOfClaim = new Date('2017-06-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 200, date: dateOfClaim},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 15 months if the claim is 3 months after death', () => {
      const dateOfClaim = new Date('2017-07-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 14 months if the claim is 4 months after death', () => {
      const dateOfClaim = new Date('2017-08-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 13 months if the claim is 5 months after death', () => {
      const dateOfClaim = new Date('2017-09-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 12 months if the claim is 6 months after death', () => {
      const dateOfClaim = new Date('2017-10-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 11 months if the claim is 7 months after death', () => {
      const dateOfClaim = new Date('2017-11-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 10 months if the claim is 8 months after death', () => {
      const dateOfClaim = new Date('2017-12-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 9 months if the claim is 9 months after death', () => {
      const dateOfClaim = new Date('2018-01-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 8 months if the claim is 10 months after death', () => {
      const dateOfClaim = new Date('2018-02-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 7 months if the claim is 11 months after death', () => {
      const dateOfClaim = new Date('2018-03-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 6 months if the claim is 12 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-04-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 5 months if the claim is 13 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-05-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 4 months if the claim is 14 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-06-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 3 months if the claim is 15 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-07-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 2 months if the claim is 16 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-08-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 1 months if the claim is 17 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-09-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay no monthly payments if the claim is 18 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-10-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 300, date: dateOfClaim}
      ]);
    });
    it('should backdate 2 months of payments and pay no monthly payments if the claim is 19 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-11-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 200, date: dateOfClaim}
      ]);
    });
    it('should backdate 1 monthly payment and pay no further payments if the claim is 20 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-12-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 100, date: dateOfClaim}
      ]);
    });
    it('should schedule no payments if the claim is 21 or more months after death, no inital payment', () => {
      const dateOfClaim = new Date('2019-01-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([]);
    });
  });
  describe('higher rate', () => {
    it('should generate a full schedule claimant reaches SPA after 18 months', () => {
      const dateOfClaim = new Date('2017-04-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 500, date: new Date('2017-05-08')},
        {amount: 500, date: new Date('2017-06-08')},
        {amount: 500, date: new Date('2017-07-08')},
        {amount: 500, date: new Date('2017-08-08')},
        {amount: 500, date: new Date('2017-09-08')},
        {amount: 500, date: new Date('2017-10-08')},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 1 monthly payment and pay for 17 months if the claim is 1 month after death', () => {
      const dateOfClaim = new Date('2017-05-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 500, date: dateOfClaim},
        {amount: 500, date: new Date('2017-06-08')},
        {amount: 500, date: new Date('2017-07-08')},
        {amount: 500, date: new Date('2017-08-08')},
        {amount: 500, date: new Date('2017-09-08')},
        {amount: 500, date: new Date('2017-10-08')},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 2 months of payments and pay for 16 months if the claim is 2 months after death', () => {
      const dateOfClaim = new Date('2017-06-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1000, date: dateOfClaim},
        {amount: 500, date: new Date('2017-07-08')},
        {amount: 500, date: new Date('2017-08-08')},
        {amount: 500, date: new Date('2017-09-08')},
        {amount: 500, date: new Date('2017-10-08')},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 15 months if the claim is 3 months after death', () => {
      const dateOfClaim = new Date('2017-07-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2017-08-08')},
        {amount: 500, date: new Date('2017-09-08')},
        {amount: 500, date: new Date('2017-10-08')},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 14 months if the claim is 4 months after death', () => {
      const dateOfClaim = new Date('2017-08-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2017-09-08')},
        {amount: 500, date: new Date('2017-10-08')},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 13 months if the claim is 5 months after death', () => {
      const dateOfClaim = new Date('2017-09-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2017-10-08')},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 12 months if the claim is 6 months after death', () => {
      const dateOfClaim = new Date('2017-10-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2017-11-08')},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 11 months if the claim is 7 months after death', () => {
      const dateOfClaim = new Date('2017-11-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2017-12-08')},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 10 months if the claim is 8 months after death', () => {
      const dateOfClaim = new Date('2017-12-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-01-08')},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 9 months if the claim is 9 months after death', () => {
      const dateOfClaim = new Date('2018-01-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-02-08')},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 8 months if the claim is 10 months after death', () => {
      const dateOfClaim = new Date('2018-02-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-03-08')},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 7 months if the claim is 11 months after death', () => {
      const dateOfClaim = new Date('2018-03-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 5000, date: dateOfClaim},
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-04-08')},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 6 months if the claim is 12 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-04-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-05-08')},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 5 months if the claim is 13 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-05-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-06-08')},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 4 months if the claim is 14 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-06-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-07-08')},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 3 months if the claim is 15 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-07-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-08-08')},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 2 months if the claim is 16 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-08-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-09-08')},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 1 months if the claim is 17 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-09-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim},
        {amount: 500, date: new Date('2018-10-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay no monthly payments if the claim is 18 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-10-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1500, date: dateOfClaim}
      ]);
    });
    it('should backdate 2 months of payments and pay no monthly payments if the claim is 19 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-11-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 1000, date: dateOfClaim}
      ]);
    });
    it('should backdate 1 monthly payment and pay no further payments if the claim is 20 months after death, no inital payment', () => {
      const dateOfClaim = new Date('2018-12-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([
        {amount: 500, date: dateOfClaim}
      ]);
    });
    it('should schedule no payments if the claim is 21 or more months after death, no inital payment', () => {
      const dateOfClaim = new Date('2019-01-25');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, true);
      expect(schedule).to.deep.equal([]);
    });
  });
  describe('reaching pensionable age', () => {
    it('should generate a full schedule if the claimant reaches state pension age after their last payment', () => {
      const dateOfClaim = new Date('2017-04-25');
      const dateOfPensionAge = new Date('2018-10-09');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')},
        {amount: 100, date: new Date('2018-10-08')}
      ]);
    });
    it('should generate a 17 month schedule if the claimant reaches state pension age on the day of their last payment', () => {
      const dateOfClaim = new Date('2017-04-25');
      const dateOfPensionAge = new Date('2018-10-08');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')}
      ]);
    });
    it('should generate a 17 month schedule if the claimant reaches state pension age a day before their last payment', () => {
      const dateOfClaim = new Date('2017-04-25');
      const dateOfPensionAge = new Date('2018-10-07');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')},
        {amount: 100, date: new Date('2018-09-08')}
      ]);
    });
    it('should generate a 16 month schedule if the claimant reaches state pension age a day before their 17th payment', () => {
      const dateOfClaim = new Date('2017-04-25');
      const dateOfPensionAge = new Date('2018-09-07');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')},
        {amount: 100, date: new Date('2018-08-08')}
      ]);
    });
    it('should generate a 15 month schedule if the claimant reaches state pension age a day before their 16th payment', () => {
      const dateOfClaim = new Date('2017-04-25');
      const dateOfPensionAge = new Date('2018-08-07');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')},
        {amount: 100, date: new Date('2018-07-08')}
      ]);
    });
    it('should generate a 14 month schedule if the claimant reaches state pension age a day before their 15th payment', () => {
      const dateOfClaim = new Date('2017-04-25');
      const dateOfPensionAge = new Date('2018-07-07');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 100, date: new Date('2017-05-08')},
        {amount: 100, date: new Date('2017-06-08')},
        {amount: 100, date: new Date('2017-07-08')},
        {amount: 100, date: new Date('2017-08-08')},
        {amount: 100, date: new Date('2017-09-08')},
        {amount: 100, date: new Date('2017-10-08')},
        {amount: 100, date: new Date('2017-11-08')},
        {amount: 100, date: new Date('2017-12-08')},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')}
      ]);
    });
    it('should backdate 3 months of payments and pay for 10 months if the claim is 8 months after death', () => {
      const dateOfClaim = new Date('2017-12-25');
      const dateOfPensionAge = new Date('2018-07-07');
      const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, false);
      expect(schedule).to.deep.equal([
        {amount: 2500, date: dateOfClaim},
        {amount: 300, date: dateOfClaim},
        {amount: 100, date: new Date('2018-01-08')},
        {amount: 100, date: new Date('2018-02-08')},
        {amount: 100, date: new Date('2018-03-08')},
        {amount: 100, date: new Date('2018-04-08')},
        {amount: 100, date: new Date('2018-05-08')},
        {amount: 100, date: new Date('2018-06-08')}
      ]);
    });
  });
});
