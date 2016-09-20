'use strict';

const rp = require('request-promise');
const config = require('../../../config/app');
const template = require('./template');

module.exports = {
  get(req, res) {
    if (req.session.confirmation) {
      template.render(req.getSession('confirmation'), res);
    } else {
      req.session.destroy();
      res.redirect('/');
    }
  },

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
