'use strict';

const isEmpty = require('../../utils/is-empty');
const isValidNino = require('../../utils/is-valid-nino');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidDateObject = require('../../utils/is-valid-date-object');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const whiteListObject = require('../../utils/white-list-object');
const renderForm = require('../../lib/render-form');
const template = require('./template.marko');

const formFields = [
  'nino', 'nameOnAccount', 'accountNumber', 'sortCode', 'rate', 'sex',
  'dateOfClaim', 'dateOfDeath', 'dateOfBirth'
];

module.exports = {
  get: renderForm('bsp'),

  post(req, res) {
    const values = whiteListObject(req.body, formFields);
    const {nino, nameOnAccount, accountNumber, sortCode, rate, sex, dateOfClaim,
           dateOfDeath, dateOfBirth} = values;
    const errors = {};

    if (isEmpty(nino)) {
      errors.nino = req.t('bsp:form.nino.errors.presence');
    } else if (!isValidNino(nino)) {
      errors.nino = req.t('bsp:form.nino.errors.format');
    }

    if (isEmpty(dateOfBirth.day) && isEmpty(dateOfBirth.month) && isEmpty(dateOfBirth.year)) {
      errors.dateOfBirth = req.t('bsp:form.dateOfBirth.errors.presence');
    } else if (!isValidDateObject(dateOfBirth)) {
      errors.dateOfBirth = req.t('bsp:form.dateOfBirth.errors.format');
    }

    if (isEmpty(sex)) {
      errors.sex = req.t('bsp:form.sex.errors.presence');
    } else if (sex !== 'female' && sex !== 'male') {
      errors.sex = req.t('bsp:form.sex.errors.format');
    }

    if (isEmpty(dateOfDeath.day) && isEmpty(dateOfDeath.month) && isEmpty(dateOfDeath.year)) {
      errors.dateOfDeath = req.t('bsp:form.dateOfDeath.errors.presence');
    } else if (!isValidDateObject(dateOfDeath)) {
      errors.dateOfDeath = req.t('bsp:form.dateOfDeath.errors.format');
    }

    if (isEmpty(dateOfClaim.day) && isEmpty(dateOfClaim.month) && isEmpty(dateOfClaim.year)) {
      errors.dateOfClaim = req.t('bsp:form.dateOfClaim.errors.presence');
    } else if (!isValidDateObject(dateOfClaim)) {
      errors.dateOfClaim = req.t('bsp:form.dateOfClaim.errors.format');
    }

    if (isEmpty(rate)) {
      errors.rate = req.t('bsp:form.rate.errors.presence');
    } else if (rate !== 'higher' && rate !== 'standard') {
      errors.rate = req.t('bsp:form.rate.errors.format');
    }

    if (isEmpty(nameOnAccount)) {
      errors.nameOnAccount = req.t('bsp:form.nameOnAccount.errors.presence');
    }

    if (isEmpty(sortCode)) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.presence');
    } else if (!isValidSortCode(sanitiseSortCode(sortCode))) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.format');
    }

    if (isEmpty(accountNumber)) {
      errors.accountNumber = req.t('bsp:form.accountNumber.errors.presence');
    } else if (!isValidAccountNumber(accountNumber)) {
      errors.accountNumber = req.t('bsp:form.accountNumber.errors.format');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      res.setSessionAndRedirect('bsp', values, '/confirmation');
    }
  }
};
