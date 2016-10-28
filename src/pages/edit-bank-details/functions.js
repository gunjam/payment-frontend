'use strict';

const got = require('got');
const isEmpty = require('../../utils/is-empty');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const {bankAccountsApi, updateBankAccountApi} = require('../../../config/app');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const whiteListObject = require('../../utils/white-list-object');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const template = require('./template.marko');

const formFields = ['nameOnAccount', 'accountNumber', 'sortCode'];
const json = true;

module.exports = {
  get(req, res) {
    const scheduleId = req.params.id;
    template.render({scheduleId, errors: false, values: {}}, res);
  },

  post(req, res, next) {
    const scheduleId = req.params.id;
    const values = whiteListObject(req.body, formFields);
    const {nameOnAccount, accountNumber, sortCode} = values;
    const errors = {};

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
      template.render({scheduleId, errors, values}, res);
    } else {
      const formattedSortCode = dashUpSortCode(sanitiseSortCode(sortCode));

      got.put(bankAccountsApi, {
        json, body: {nameOnAccount, accountNumber, sortCode: formattedSortCode}
      })
      .then(response => got.post(updateBankAccountApi, {
        json, body: {scheduleId, bankAccountId: response.body.id, date: new Date().toISOString()}
      }))
      .then(() => res.redirect('/schedule/' + scheduleId))
      .catch(err => next(err));
    }
  }
};
