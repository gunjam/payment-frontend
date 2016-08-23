'use strict';

const isEmpty = require('./is-empty');

module.exports = function (object) {
  return Object.keys(object).reduce((noEmpties, property) => {
    if (typeof object[property] === 'object' || !isEmpty(object[property])) {
      noEmpties[property] = object[property];
    }
    return noEmpties;
  }, {});
};
