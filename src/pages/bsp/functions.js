'use strict';

const isEmpty = require('../../utils/is-empty');
const isYesOrNo = require('../../utils/is-yes-or-no');
const isValidNino = require('../../utils/is-valid-nino');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidDateObject = require('../../utils/is-valid-date-object');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const generateBSPSchedule = require('../../lib/generate-bsp-schedule');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    template.render({errors: false, values: false}, res);
  },

  post(req, res) {
    const values = req.body;
    const {nino, accountNumber, sortCode1, sortCode2, sortCode3, rate, pensionAge} = values;
    const errors = {};
    const sortCode = `${sortCode1}-${sortCode2}-${sortCode3}`;
    const dateOfClaim = values.dateOfClaim || {};
    const dateOfDeath = values.dateOfDeath || {};

    // Validate nino
    if (isEmpty(nino)) {
      errors.nino = req.t('bsp:form.nino.errors.presence');
    } else if (!isValidNino(nino)) {
      errors.nino = req.t('bsp:form.nino.errors.format');
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

    // Validate dateOfDeath
    if (isEmpty(dateOfDeath.day) && isEmpty(dateOfDeath.month) && isEmpty(dateOfDeath.year)) {
      errors.dateOfDeath = req.t('bsp:form.dateOfDeath.errors.presence');
    } else if (!isValidDateObject(dateOfDeath)) {
      errors.dateOfDeath = req.t('bsp:form.dateOfDeath.errors.format');
    }

    // Validate rate
    if (isEmpty(rate)) {
      errors.rate = req.t('bsp:form.rate.errors.presence');
    } else if (rate !== 'higher' && rate !== 'standard') {
      errors.rate = req.t('bsp:form.rate.errors.format');
    }

    // Validate pensionAge
    if (isEmpty(pensionAge)) {
      errors.pensionAge = req.t('bsp:form.pensionAge.errors.presence');
    } else if (!isYesOrNo(pensionAge)) {
      errors.pensionAge = req.t('bsp:form.pensionAge.errors.format');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      const claimDate = new Date(dateOfClaim.year, dateOfClaim.month - 1, dateOfClaim.day);
      const deathDate = new Date(dateOfDeath.year, dateOfDeath.month - 1, dateOfDeath.day);
      const paymentSchedule = generateBSPSchedule(claimDate, deathDate, rate);
      const data = {nationalInsuranceNumber: nino, sortCode, accountNumber, paymentSchedule};
      res.setSessionAndRedirect('confirmation', data, '/confirmation');
    }
  }
};
