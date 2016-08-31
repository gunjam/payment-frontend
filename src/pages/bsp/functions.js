'use strict';

const rp = require('request-promise');
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

  post(req, res, next) {
    const values = req.body;
    const errors = {};
    const sortCode = `${values.sortCode1}-${values.sortCode2}-${values.sortCode3}`;
    const dateOfClaim = values.dateOfClaim || {};
    const dateOfDeath = values.dateOfDeath || {};

    // Validate nationalInsuranceNumber
    if (isEmpty(values.nationalInsuranceNumber)) {
      errors.nationalInsuranceNumber = req.t('bsp:form.nationalInsuranceNumber.errors.presence');
    } else if (!isValidNino(values.nationalInsuranceNumber)) {
      errors.nationalInsuranceNumber = req.t('bsp:form.nationalInsuranceNumber.errors.format');
    }

    // Validate sortCode
    if (isEmpty(values.sortCode1) && isEmpty(values.sortCode2) && isEmpty(values.sortCode3)) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.presence');
    } else if (!isValidSortCode(sortCode)) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.format');
    }

    // Validate accountNumber
    if (isEmpty(values.accountNumber)) {
      errors.accountNumber = req.t('bsp:form.accountNumber.errors.presence');
    } else if (!isValidAccountNumber(values.accountNumber)) {
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

    // Validate rateOfPayment
    if (isEmpty(values.rateOfPayment)) {
      errors.rateOfPayment = req.t('bsp:form.rateOfPayment.errors.presence');
    } else if (values.rateOfPayment !== 'higher' && values.rateOfPayment !== 'lower') {
      errors.rateOfPayment = req.t('bsp:form.rateOfPayment.errors.format');
    }

    // Validate statePensionAge
    if (isEmpty(values.statePensionAge)) {
      errors.statePensionAge = req.t('bsp:form.statePensionAge.errors.presence');
    } else if (!isYesOrNo(values.statePensionAge)) {
      errors.statePensionAge = req.t('bsp:form.statePensionAge.errors.format');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      const dateOfClaim = new Date(values.dateOfClaim.year, values.dateOfClaim.month - 1, values.dateOfClaim.day);
      const dateOfDeath = new Date(values.dateOfDeath.year, values.dateOfDeath.month - 1, values.dateOfDeath.day);
      const paymentPUT = {
        method: 'PUT',
        uri: 'http://localhost:3000/api/Schedules',
        json: true,
        body: {
          nationalInsuranceNumber: values.nationalInsuranceNumber,
          sortCode,
          accountNumber: values.accountNumber,
          paymentSchedule: generateBSPSchedule(dateOfClaim, dateOfDeath, values.rateOfPayment)
        }
      };
      rp(paymentPUT)
        .then(() => res.redirect('/confirmation'))
        .catch(err => next(err));
    }
  }
};
