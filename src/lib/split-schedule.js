'use strict';

module.exports = function (schedule, dateToSplitOn = new Date()) {
  const splitIndex = schedule.findIndex(payment => new Date(payment.date) > dateToSplitOn);
  const sliceIndex = splitIndex === -1 ? schedule.length : splitIndex;
  return [schedule.slice(0, sliceIndex), schedule.slice(sliceIndex)];
};
