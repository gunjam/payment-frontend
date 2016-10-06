'use strict';

const stripSpacesAndDashes = /[ -]/g;

module.exports = function (input) {
  return input.replace(stripSpacesAndDashes, '');
};
