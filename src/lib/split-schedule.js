'use strict';

module.exports = function (schedule, dateToSplitOn = new Date()) {
  const splitIndex = schedule.findIndex(payment => new Date(payment.date) > dateToSplitOn);
  return splitIndex === -1 ? [schedule, []] : [schedule.slice(0, splitIndex), schedule.slice(splitIndex)];
};
