'use strict';

module.exports = function (payments) {
  return payments.slice(1).reduce(
    (pre, cur) => pre[pre.length - 1].id === cur.bankAccount.id ? pre : [...pre, cur.bankAccount],
    [payments[0].bankAccount]
  );
};
