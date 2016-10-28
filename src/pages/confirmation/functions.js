'use strict';

const got = require('got');
const {bankAccountsApi, schedulesFullApi} = require('../../../config/app');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const sanitiseNino = require('../../utils/sanitise-nino');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const template = require('./template.marko');

const pensionAgeUri = 'https://www.gov.uk/state-pension-age/y/age/';
const json = true;

module.exports = {
  get(req, res) {
    const formData = req.getSession('bsp');
    const {thePast} = req.query;

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
        dateOfPensionAge: got(pensionAgeUri + birthDate + '/' + sex),
        thePast: thePast === ''
      }, res);
    } else {
      req.session.destroy();
      res.redirect('/');
    }
  },

  post(req, res, next) {
    const {nameOnAccount, accountNumber, sortCode, nationalInsuranceNumber, paymentSchedule} = req.body;
    const body = {nameOnAccount, sortCode, accountNumber};

    got.put(bankAccountsApi, {body, json})
      .then(response => {
        const bankAccountId = response.body.id;
        const body = {nationalInsuranceNumber, paymentSchedule, bankAccountId};

        return got.post(schedulesFullApi, {body, json});
      })
      .then(response => res.setSessionAndRedirect('done', {scheduleId: response.body.id}, '/done'))
      .catch(err => next(err));
  }
};
