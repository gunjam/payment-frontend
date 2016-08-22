'use strict';

const rp = require('request-promise');
const isEmpty = require('../../utils/is-empty');
const isNumeric = require('../../utils/is-numeric');
const isValidDateObject = require('../../utils/is-valid-date-object');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    template.render({errors: false, values: false}, res);
  },

  post(req, res, next) {
    const errors = {};
    const values = req.body;
    const dateOfPayment = req.body['date-of-payment'] || {};

    if (isEmpty(values['sort-code-1']) ||
        isEmpty(values['sort-code-2']) ||
        isEmpty(values['sort-code-3'])) {
      errors['sort-code'] = req.t('pay:form.sortCode.errorBlank');
    } else if (
      !isNumeric(values['sort-code-1']) ||
      !isNumeric(values['sort-code-2']) ||
      !isNumeric(values['sort-code-3'])) {
      errors['sort-code'] = req.t('pay:form.sortCode.errorInvalid');
    }

    if (isEmpty(values['account-number'])) {
      errors['account-number'] = req.t('pay:form.accountNumber.errorBlank');
    } else if (!isNumeric(values['account-number'])) {
      errors['account-number'] = req.t('pay:form.accountNumber.errorInvalid');
    }

    if (isEmpty(values['initial-amount'])) {
      errors['initial-amount'] = req.t('pay:form.initialAmount.errorBlank');
    } else if (!isNumeric(values['initial-amount'])) {
      errors['initial-amount'] = req.t('pay:form.initialAmount.errorInvalid');
    }

    if (isEmpty(dateOfPayment.day) ||
        isEmpty(dateOfPayment.month) ||
        isEmpty(dateOfPayment.year)) {
      errors['date-of-payment'] = req.t('pay:form.dateOfPayment.errorEmpty');
    } else if (!isValidDateObject(dateOfPayment)) {
      errors['date-of-payment'] = req.t('pay:form.dateOfPayment.errorInvalid');
    }

    if (isEmpty(values['day-of-month-to-pay'])) {
      errors['day-of-month-to-pay'] = req.t('pay:form.dayOfMonthToPay.errorBlank');
    } else if (!isNumeric(values['day-of-month-to-pay'])) {
      errors['day-of-month-to-pay'] = req.t('pay:form.dayOfMonthToPay.errorInvalid');
    }

    if (isEmpty(values['number-of-payments'])) {
      errors['number-of-payments'] = req.t('pay:form.numberOfPayments.errorBlank');
    } else if (!isNumeric(values['number-of-payments'])) {
      errors['number-of-payments'] = req.t('pay:form.numberOfPayments.errorInvalid');
    }

    if (Object.keys(errors).length > 0) {
      template.render({errors, values}, res);
    } else {
      const payment = {
        sortCode: `${values['sort-code-1']}${values['sort-code-2']}${values['sort-code-3']}`,
        accountNumber: values['account-number'],
        initialAmount: values['initial-amount'],
        dateOfPayment: `${dateOfPayment.day}-${dateOfPayment.month}-${dateOfPayment.year}`,
        monthlyPayment: 1,
        dayOfMonthToPay: values['day-of-month-to-pay'],
        numberOfPayments: values['number-of-payments']
      };
      const options = {
        method: 'PUT',
        uri: 'http://localhost:3000/api/payments',
        body: payment,
        json: true
      };
      rp(options)
        .then(() => res.redirect('/confirmation'))
        .catch(err => next(err));
    }
  }
};
