'use strict';

const {expect} = require('chai');
const generateBSPSchedule = require('../lib/generate-bsp-schedule');

const dateOfDeath = new Date('2016-01-20');
const dateOfPensionAge = new Date('2021-05-22');

describe('generateBSPSchedule()', () => {
  it('1', () => {
    const dateOfClaim = new Date('2016-01-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-02-20')
      },
      {
        amount: 100,
        date: new Date('2016-03-20')
      },
      {
        amount: 100,
        date: new Date('2016-04-20')
      },
      {
        amount: 100,
        date: new Date('2016-05-20')
      },
      {
        amount: 100,
        date: new Date('2016-06-20')
      },
      {
        amount: 100,
        date: new Date('2016-07-20')
      },
      {
        amount: 100,
        date: new Date('2016-08-20')
      },
      {
        amount: 100,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('2', () => {
    const dateOfClaim = new Date('2016-02-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-03-20')
      },
      {
        amount: 200,
        date: new Date('2016-04-20')
      },
      {
        amount: 100,
        date: new Date('2016-05-20')
      },
      {
        amount: 100,
        date: new Date('2016-06-20')
      },
      {
        amount: 100,
        date: new Date('2016-07-20')
      },
      {
        amount: 100,
        date: new Date('2016-08-20')
      },
      {
        amount: 100,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('3', () => {
    const dateOfClaim = new Date('2016-03-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-04-20')
      },
      {
        amount: 300,
        date: new Date('2016-05-20')
      },
      {
        amount: 100,
        date: new Date('2016-06-20')
      },
      {
        amount: 100,
        date: new Date('2016-07-20')
      },
      {
        amount: 100,
        date: new Date('2016-08-20')
      },
      {
        amount: 100,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('4', () => {
    const dateOfClaim = new Date('2016-04-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-05-20')
      },
      {
        amount: 300,
        date: new Date('2016-06-20')
      },
      {
        amount: 100,
        date: new Date('2016-07-20')
      },
      {
        amount: 100,
        date: new Date('2016-08-20')
      },
      {
        amount: 100,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('5', () => {
    const dateOfClaim = new Date('2016-05-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-06-20')
      },
      {
        amount: 300,
        date: new Date('2016-07-20')
      },
      {
        amount: 100,
        date: new Date('2016-08-20')
      },
      {
        amount: 100,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('6', () => {
    const dateOfClaim = new Date('2016-06-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-07-20')
      },
      {
        amount: 300,
        date: new Date('2016-08-20')
      },
      {
        amount: 100,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('7', () => {
    const dateOfClaim = new Date('2016-07-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-08-20')
      },
      {
        amount: 300,
        date: new Date('2016-09-20')
      },
      {
        amount: 100,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('8', () => {
    const dateOfClaim = new Date('2016-08-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-09-20')
      },
      {
        amount: 300,
        date: new Date('2016-10-20')
      },
      {
        amount: 100,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('9', () => {
    const dateOfClaim = new Date('2016-09-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-10-20')
      },
      {
        amount: 300,
        date: new Date('2016-11-20')
      },
      {
        amount: 100,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('10', () => {
    const dateOfClaim = new Date('2016-10-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-11-20')
      },
      {
        amount: 300,
        date: new Date('2016-12-20')
      },
      {
        amount: 100,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('11', () => {
    const dateOfClaim = new Date('2016-11-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2016-12-20')
      },
      {
        amount: 300,
        date: new Date('2017-01-20')
      },
      {
        amount: 100,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('12', () => {
    const dateOfClaim = new Date('2016-12-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 2500,
        date: new Date('2017-01-20')
      },
      {
        amount: 300,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      },
      {
        amount: 100,
        date: new Date('2017-08-20')
      }
    ]);
  });
  it('13', () => {
    const dateOfClaim = new Date('2017-01-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 300,
        date: new Date('2017-02-20')
      },
      {
        amount: 100,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      }
    ]);
  });
  it('14', () => {
    const dateOfClaim = new Date('2017-02-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 300,
        date: new Date('2017-03-20')
      },
      {
        amount: 100,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      }
    ]);
  });
  it('15', () => {
    const dateOfClaim = new Date('2017-03-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 300,
        date: new Date('2017-04-20')
      },
      {
        amount: 100,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      }
    ]);
  });
  it('16', () => {
    const dateOfClaim = new Date('2017-04-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 300,
        date: new Date('2017-05-20')
      },
      {
        amount: 100,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      }
    ]);
  });
  it('17', () => {
    const dateOfClaim = new Date('2017-05-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 300,
        date: new Date('2017-06-20')
      },
      {
        amount: 100,
        date: new Date('2017-07-20')
      }
    ]);
  });
  it('18', () => {
    const dateOfClaim = new Date('2017-06-21');
    const schedule = generateBSPSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, 'standard');
    expect(schedule).to.deep.equal([
      {
        amount: 300,
        date: new Date('2017-07-20')
      }
    ]);
  });
});
