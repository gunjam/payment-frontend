'use strict';

const rp = require('request-promise');
const {schedulesApi} = require('../../../config/app');
const template = require('./template.marko');

const apiFilter = '?filter[include]=bankAccounts&filter[include][paymentSchedule][bankAccount]';

module.exports = {
  get(req, res) {
    const uri = schedulesApi + '/' + req.params.id + apiFilter;
    const schedulePromise = rp({uri, transform: JSON.parse}).promise();
    template.render({schedulePromise}, res);
  }
};
