'use strict';

const rp = require('request-promise');
const isEmpty = require('../../utils/is-empty');
const sanitiseNino = require('../../utils/sanitise-nino');
const template = require('./template.marko');

const schedulesApi = 'http://localhost:3000/api/Schedules/';

module.exports = {
  get(req, res) {
    const sanitisedNino = sanitiseNino(req.query.nino);
    const uri = schedulesApi + '?filter[where][nationalInsuranceNumber]=' +
      encodeURIComponent(sanitisedNino);

    template.render({
      searchResultsPromise: rp({uri, transform: JSON.parse}).promise(),
      searched: !isEmpty(sanitisedNino)
    }, res);
  }
};
