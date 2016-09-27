'use strict';

const rp = require('request-promise');
const {bankAccountsApi, schedulesFullApi} = require('../../../config/app');
const template = require('./template');

const json = true;
const PUT = 'PUT';
const POST = 'POST';

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
    const session = req.getSession('confirmation');
    const {account, nationalInsuranceNumber, paymentSchedule} = session;

    rp({method: PUT, uri: bankAccountsApi, json, body: account})
      .then(body => {
        const linkedSchedule = paymentSchedule.map(i => Object.assign(i, {bankAccountId: body.id}));
        const data = {nationalInsuranceNumber, paymentSchedule: linkedSchedule};

        rp({method: POST, uri: schedulesFullApi, json, body: data})
          .then(() => {
            req.session.destroy();
            res.redirect('/done');
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
};
