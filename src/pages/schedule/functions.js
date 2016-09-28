'use strict';

const rp = require('request-promise');
const {schedulesApi} = require('../../../config/app');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const uri = schedulesApi + '/' + req.params.id + '?filter[include][paymentSchedule][bankAccount]';
    const schedulePromise = rp({uri, transform: JSON.parse}).promise();
    template.render({schedulePromise}, res);
  }
};
