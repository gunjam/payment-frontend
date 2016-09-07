'use strict';

module.exports = function (input) {
  const nino = (typeof input === 'string') ? input : '';
  return nino.toUpperCase();
};
