'use strict';

module.exports = function (object, ...properties) {
  return properties.reduce((safe, property) => {
    if ({}.hasOwnProperty.call(object, property)) {
      safe[property] = object[property];
    }
    return safe;
  }, {});
};
