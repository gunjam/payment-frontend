'use strict';

const rp = require('request-promise');
const {schedulesApi} = require('../../../config/app');
const isEmpty = require('../../utils/is-empty');
const isValidDateObject = require('../../utils/is-valid-date-object');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const scheduleId = req.params.id;
    template.render({scheduleId, errors: false, values: {}}, res);
  },

  post(req, res, next) {
    const scheduleId = req.params.id;
    const values = req.body;
    const {reason = '', deathDate = {}, prisonDate = {}} = values;
    const errors = {};

    if (reason === 'death') {
      if (isEmpty(deathDate.day) && isEmpty(deathDate.month) && isEmpty(deathDate.year)) {
        errors.deathDate = req.t('stop:form.deathDate.errors.presence');
      } else if (!isValidDateObject(deathDate)) {
        errors.deathDate = req.t('stop:form.deathDate.errors.format');
      }
    } else if (reason === 'prison') {
      if (isEmpty(prisonDate.day) && isEmpty(prisonDate.month) && isEmpty(prisonDate.year)) {
        errors.prisonDate = req.t('stop:form.prisonDate.errors.presence');
      } else if (!isValidDateObject(prisonDate)) {
        errors.prisonDate = req.t('stop:form.prisonDate.errors.format');
      }
    } else if (reason !== 'fraud' && reason !== 'error') {
      errors.reason = req.t('stop:form.reason.errors.presence');
    }

    if (Object.keys(errors).length > 0) {
      template.render({scheduleId, errors, values}, res);
    } else {
      const addStatus = schedulesApi + '/' + req.params.id + '/addStatus';
      const schedulePage = '/schedule/' + req.params.id;
      const status = {name: 'stopped', reason};
      const effectiveDate = getDateFromDateObject(values[reason + 'Date']);
      const body = (reason === 'death' || reason === 'prison') ?
        Object.assign(status, {effectiveDate}) : status;

      rp({method: 'PUT', uri: addStatus, json: true, body})
        .then(() => res.redirect(schedulePage))
        .catch(err => next(err));
    }
  }
};
