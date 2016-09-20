'use strict';

const rp = require('request-promise');
const config = require('../../../config/app');
const sanitiseNino = require('../../utils/sanitise-nino');
const isValidNino = require('../../utils/is-valid-nino');
const isEmpty = require('../../utils/is-empty');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    if (isEmpty(req.query.nino)) {
      template.render({}, res);
    } else {
      const sanitisedNino = sanitiseNino(req.query.nino);

      if (isValidNino(sanitisedNino)) {
        const uri = config.apiUrl + '?filter[where][nationalInsuranceNumber]=' +
          encodeURIComponent(sanitisedNino);

        template.render({
          searchResultsPromise: rp({uri, transform: JSON.parse}).promise()
        }, res);
      } else {
        template.render({
          errors: {search: 'Enter a valid National Insurance number'}
        }, res);
      }
    }
  }
};
