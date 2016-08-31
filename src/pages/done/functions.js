'use strict';

const template = require('./template.marko');

module.exports = {
  get(req, res) {
    template.render({}, res);
  }
};
