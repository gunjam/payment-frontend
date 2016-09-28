'use strict';

module.exports = function numberOfBankAccounts(schedule) {
  return schedule.map(i => i.bankAccountId).filter((v, i, a) => i === a.lastIndexOf(v)).length;
};
