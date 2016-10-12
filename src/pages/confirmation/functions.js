'use strict';

const rp = require('request-promise');
const {bankAccountsApi, schedulesFullApi} = require('../../../config/app');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const sanitiseNino = require('../../utils/sanitise-nino');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const promiseDateOfPensionAge = require('../../lib/promise-date-of-pension-age');
const template = require('./template.marko');

const json = true;
const POST = 'POST';
const PUT = 'PUT';

module.exports = {
  get(req, res) {
    const formData = req.getSession('bsp');

    if (Object.keys(formData).length > 0) {
      const {nino, nameOnAccount, accountNumber, sortCode, rate} = formData;
      const {sex, dateOfClaim, dateOfDeath, dateOfBirth} = formData;
      const birthDate = getDateFromDateObject(dateOfBirth);

      template.render({
        nationalInsuranceNumber: sanitiseNino(nino),
        birthDate,
        sex,
        deathDate: getDateFromDateObject(dateOfDeath),
        claimDate: getDateFromDateObject(dateOfClaim),
        rate,
        nameOnAccount,
        sortCode: dashUpSortCode(sanitiseSortCode(sortCode)),
        accountNumber,
        dateOfPensionAge: promiseDateOfPensionAge(birthDate, sex)
      }, res);
    } else {
      req.session.destroy();
      res.redirect('/');
    }
  },

  post(req, res, next) {
    const {nameOnAccount, accountNumber, sortCode, nationalInsuranceNumber} = req.body;
    const account = {nameOnAccount, sortCode, accountNumber};

    rp({method: PUT, uri: bankAccountsApi, json, body: account})
      .then(body => {
        const paymentSchedule = JSON.parse(req.body.paymentSchedule);
        const linkedSchedule = paymentSchedule.map(i => Object.assign(i, {bankAccountId: body.id}));
        const data = {nationalInsuranceNumber, paymentSchedule: linkedSchedule};

        rp({method: POST, uri: schedulesFullApi, json, body: data})
          .then(body => res.setSessionAndRedirect('done', {scheduleId: body.id}, '/done'))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
};
