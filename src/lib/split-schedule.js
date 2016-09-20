'use strict';

module.exports = function (schedule, date = new Date()) {
  const now = schedule.findIndex(element => new Date(element.date) > date);
  return [schedule.slice(0, now), schedule.slice(now)];
};
