'use strict';

const got = require('got');
const {schedulesApi} = require('../../../config/app');
const sanitiseNino = require('../../utils/sanitise-nino');
const isValidNino = require('../../utils/is-valid-nino');
const template = require('./template.marko');

const apiFilter = '?filter[include][paymentSchedule][bankAccount]&filter[where][nationalInsuranceNumber]=';

module.exports = {
  get(req, res) {
    const {nino} = req.query;

    if (nino === undefined) {
      template.render({errors: false}, res);
    } else if (nino === '') {
      const errors = {search: req.t('search:form.search.errors.presence')};
      template.render({errors}, res);
    } else {
      const sanitisedNino = sanitiseNino(nino);

      if (isValidNino(sanitisedNino)) {
        const uri = schedulesApi + apiFilter + encodeURIComponent(sanitisedNino);
        const searchResultsPromise = got(uri);
        template.render({nino, searchResultsPromise, errors: false}, res);
      } else {
        const errors = {search: req.t('search:form.search.errors.format')};
        template.render({nino, errors}, res);
      }
    }
  }
};
