'use strict';

const got = require('got');
const {bankAccountsApi, schedulesFullApi} = require('../../../config/app');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const sanitiseNino = require('../../utils/sanitise-nino');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const template = require('./template.marko');

const pensionAgeUri = 'https://www.gov.uk/state-pension-age/y/age/';

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
    const {nameOnAccount, accountNumber, sortCode, nationalInsuranceNumber} = req.body;
    const body = {nameOnAccount, sortCode, accountNumber};

    got.put(bankAccountsApi, {body})
      .then(response => {
        const bankAccountId = JSON.parse(response.body).id;
        const paymentSchedule = req.body.paymentSchedule;
        const body = {nationalInsuranceNumber, paymentSchedule, bankAccountId};

        return got.post(schedulesFullApi, {body});
      })
      .then(response => res.setSessionAndRedirect('done', {scheduleId: JSON.parse(response.body).id}, '/done'))
      .catch(err => next(err));
  }
};
