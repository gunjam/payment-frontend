'use strict';

const rp = require('request-promise');
const tomorrow = require('../../lib/tomorrow');
const isEmpty = require('../../utils/is-empty');
const isValidNino = require('../../utils/is-valid-nino');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidDateObject = require('../../utils/is-valid-date-object');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const generateBSPSchedule = require('../../lib/generate-bsp-schedule');
const sanitiseNino = require('../../utils/sanitise-nino');
const template = require('./template.marko');

const pensionDate = /You’ll reach State Pension age on +(\d{1,2} \w{3,9} \d{4})/;

module.exports = {
  get(req, res) {
    template.render({errors: false, values: false}, res);
  },

  post(req, res, next) {
    const values = req.body;
    const {nino, nameOnAccount, accountNumber, sortCode1, sortCode2, sortCode3, rate, sex} = values;
    const errors = {};
    const sortCode = `${sortCode1}-${sortCode2}-${sortCode3}`;
    const dateOfClaim = values.dateOfClaim || {};
    const dateOfDeath = values.dateOfDeath || {};
    const dateOfBirth = values.dateOfBirth || {};

    // Validate nino
    if (isEmpty(nino)) {
      errors.nino = req.t('bsp:form.nino.errors.presence');
    } else if (!isValidNino(nino)) {
      errors.nino = req.t('bsp:form.nino.errors.format');
    }

    // Validate nameOnAccount
    if (isEmpty(nameOnAccount)) {
      errors.nameOnAccount = req.t('bsp:form.nameOnAccount.errors.presence');
    }

    // Validate sortCode
    if (isEmpty(sortCode1) && isEmpty(sortCode2) && isEmpty(sortCode3)) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.presence');
    } else if (!isValidSortCode(sortCode)) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.format');
    }

    // Validate accountNumber
    if (isEmpty(accountNumber)) {
      errors.accountNumber = req.t('bsp:form.accountNumber.errors.presence');
    } else if (!isValidAccountNumber(accountNumber)) {
      errors.accountNumber = req.t('bsp:form.accountNumber.errors.format');
    }

    // Validate dateOfClaim
    if (isEmpty(dateOfClaim.day) && isEmpty(dateOfClaim.month) && isEmpty(dateOfClaim.year)) {
      errors.dateOfClaim = req.t('bsp:form.dateOfClaim.errors.presence');
    } else if (!isValidDateObject(dateOfClaim)) {
      errors.dateOfClaim = req.t('bsp:form.dateOfClaim.errors.format');
    }

    // Validate dateOfBirth
    if (isEmpty(dateOfBirth.day) && isEmpty(dateOfBirth.month) && isEmpty(dateOfBirth.year)) {
      errors.dateOfBirth = req.t('bsp:form.dateOfBirth.errors.presence');
    } else if (!isValidDateObject(dateOfBirth)) {
      errors.dateOfBirth = req.t('bsp:form.dateOfBirth.errors.format');
    }

    // Validate dateOfDeath
    if (isEmpty(dateOfDeath.day) && isEmpty(dateOfDeath.month) && isEmpty(dateOfDeath.year)) {
      errors.dateOfDeath = req.t('bsp:form.dateOfDeath.errors.presence');
    } else if (!isValidDateObject(dateOfDeath)) {
      errors.dateOfDeath = req.t('bsp:form.dateOfDeath.errors.format');
    }

    // Validate sex
    if (isEmpty(sex)) {
      errors.sex = req.t('bsp:form.sex.errors.presence');
    } else if (sex !== 'female' && sex !== 'male') {
      errors.sex = req.t('bsp:form.sex.errors.format');
    }

    // Validate rate
    if (isEmpty(rate)) {
      errors.rate = req.t('bsp:form.rate.errors.presence');
    } else if (rate !== 'higher' && rate !== 'standard') {
      errors.rate = req.t('bsp:form.rate.errors.format');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      const birthDate = getDateFromDateObject(dateOfBirth);
      rp({
        method: 'GET',
        uri: `https://www.gov.uk/state-pension-age/y/age/${birthDate}/${sex}`,
        headers: {'user-agent': 'Mozilla/5.0'}
      })
      .then(body => {
        const nationalInsuranceNumber = sanitiseNino(nino);
        const dateOfPensionAge = new Date(body.match(pensionDate)[1]);
        const claimDate = getDateFromDateObject(dateOfClaim);
        const deathDate = getDateFromDateObject(dateOfDeath);
        const higherRate = rate === 'higher';
        const startDate = tomorrow();
        const paymentSchedule = generateBSPSchedule(claimDate, deathDate, dateOfPensionAge, higherRate, startDate);
        const data = {
          nationalInsuranceNumber,
          account: {nameOnAccount, sortCode, accountNumber},
          paymentSchedule
        };
        res.setSessionAndRedirect('confirmation', data, '/confirmation');
      })
      .catch(err => next(err));
    }
  }
};
