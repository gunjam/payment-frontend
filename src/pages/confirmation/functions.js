'use strict';

const rp = require('request-promise');
const renderForm = require('../../lib/render-form');

module.exports = {
  get: renderForm('confirmation'),

  post(req, res, next) {
    const data = req.getSession('confirmation');
    rp({
      method: 'PUT',
      uri: 'http://localhost:3000/api/Schedules',
      json: true,
      body: data
    }).then(() => {
      delete req.session.confirmation;
      res.redirect('/done');
    }).catch(err => next(err));
  }
};
