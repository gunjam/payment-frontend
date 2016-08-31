'use strict';

const validSortCode = /^\d{2}-\d{2}-\d{2}$/;

module.exports = function (input) {
  return validSortCode.test(input);
};
