'use strict';

module.exports = function (schedule) {
  return schedule.slice(1).reduce((p, c) => {
    const last = p[p.length - 1];
    return (last[last.length - 1].bankAccountId === c.bankAccountId) ?
      [...p.slice(0, -1), [...last, c]] : [...p, [c]];
  }, [[schedule[0]]]);
};
