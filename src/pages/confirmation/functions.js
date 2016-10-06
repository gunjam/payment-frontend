'use strict';

const rp = require('request-promise');
const {bankAccountsApi, schedulesFullApi} = require('../../../config/app');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const {generateBSPSchedule} = require('../../lib/generate-bsp-schedule');
const sanitiseNino = require('../../utils/sanitise-nino');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const template = require('./template');

const pensionDate = /You’ll reach State Pension age on +(\d{1,2} \w{3,9} \d{4})/;

const json = true;
const PUT = 'PUT';
const GET = 'GET';
const POST = 'POST';

module.exports = {
  get(req, res, next) {
    const formData = req.getSession('bsp');

    if (Object.keys(formData).length > 0) {
      const {nino, nameOnAccount, accountNumber, sortCode, rate} = formData;
      const {sex, dateOfClaim, dateOfDeath, dateOfBirth} = formData;
      const birthDate = getDateFromDateObject(dateOfBirth);

      rp({
        method: GET,
        uri: `https://www.gov.uk/state-pension-age/y/age/${birthDate}/${sex}`,
        headers: {'user-agent': 'Mozilla/5.0'}
      })
      .then(body => {
        const formattedSortCode = dashUpSortCode(sortCode);
        const nationalInsuranceNumber = sanitiseNino(nino);
        const dateOfPensionAge = new Date(body.match(pensionDate)[1]);
        const claimDate = getDateFromDateObject(dateOfClaim);
        const deathDate = getDateFromDateObject(dateOfDeath);
        const higherRate = rate === 'higher';
        const startDate = new Date();
        const paymentSchedule = generateBSPSchedule(claimDate, deathDate, dateOfPensionAge, higherRate, startDate);
        const data = {
          nationalInsuranceNumber,
          account: {nameOnAccount, sortCode: formattedSortCode, accountNumber},
          paymentSchedule
        };
        req.session.confirmation = data;
        template.render(data, res);
      })
      .catch(err => next(err));
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
