'use strict';

const rp = require('request-promise');
const config = require('../../../config/app');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const uri = config.apiUrl + '/' + req.params.id;
    const schedulePromise = rp({uri, transform: JSON.parse}).promise();
    template.render({schedulePromise}, res);
  }
};
