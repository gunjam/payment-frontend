'use strict';

const rp = require('request-promise');
const renderForm = require('../../lib/render-form');
const config = require('../../../config/app');

module.exports = {
  get: renderForm('confirmation'),

  post(req, res, next) {
    const data = req.getSession('confirmation');
    rp({
      method: 'PUT',
      uri: config.apiUrl,
      json: true,
      body: data
    }).then(() => {
      req.session.destroy();
      res.redirect('/done');
    }).catch(err => next(err));
  }
};
