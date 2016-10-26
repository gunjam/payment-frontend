'use strict';

module.exports = function (object, properties = []) {
  return properties.reduce((safe, prop) => Object.assign(safe, {
    [prop]: {}.hasOwnProperty.call(object, prop) ? object[prop] : ''
  }), {});
};
