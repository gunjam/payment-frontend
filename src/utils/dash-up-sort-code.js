'use strict';

module.exports = function (input) {
  return input.slice(0, 2) + '-' + input.slice(2, 4) + '-' + input.slice(4);
};
