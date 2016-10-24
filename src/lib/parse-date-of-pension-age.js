'use strict';

const pensionDate = /State Pension age on +(\d{1,2} \w{3,9} \d{4})/;

module.exports = function (pensionPage) {
  return new Date(pensionPage.match(pensionDate)[1]);
};
