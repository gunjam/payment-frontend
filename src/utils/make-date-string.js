'use strict';

const oneToTwoDigits = /[0-9]{1,2}/;
const fourDigits = /[0-9]{4}/;

module.exports = function (dateObj) {
  const {day, month, year} = dateObj;
  if (oneToTwoDigits.test(day) &&
      oneToTwoDigits.test(month) &&
      fourDigits.test(year)) {
    return new Date(`${year}-${month}-${day}`);
  }
  return undefined;
};
