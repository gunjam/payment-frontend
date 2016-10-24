'use strict';

const got = require('got');
const {schedulesApi} = require('../../../config/app');
const template = require('./template.marko');

const apiFilter = '?filter[include]=bankAccounts&filter[include][paymentSchedule][bankAccount]';

module.exports = {
  get(req, res) {
    const schedulePromise = got(schedulesApi + '/' + req.params.id + apiFilter);
    template.render({schedulePromise}, res);
  }
};
