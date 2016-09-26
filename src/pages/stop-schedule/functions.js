'use strict';

const rp = require('request-promise');
const config = require('../../../config/app');
const isEmpty = require('../../utils/is-empty');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const id = req.params.id;
    template.render({id, errors: false, values: {}}, res);
  },

  post(req, res, next) {
    const id = req.params.id;
    const reason = req.body.reason;
    const errors = {};

    if (isEmpty(reason)) {
      errors.reason = req.t('stop:form.reason.errors.presence');
    }

    if (Object.keys(errors).length > 0) {
      template.render({id, errors, values: {reason}}, res);
    } else {
      const addStatus = config.apiUrl + '/' + req.params.id + '/addStatus';
      const schedulePage = '/schedule/' + req.params.id;
      const statusStopped = {name: 'stopped', reason};

      rp({method: 'PUT', uri: addStatus, json: true, body: statusStopped})
        .then(() => res.redirect(schedulePage))
        .catch(err => next(err));
    }
  }
};