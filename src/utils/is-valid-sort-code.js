'use strict';

const validSortCode = /^\d{6}$/;

module.exports = function (input) {
  return validSortCode.test(input);
};
