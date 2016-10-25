'use strict';

const got = require('got');
const isEmpty = require('../../utils/is-empty');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const {bankAccountsApi, updateBankAccountApi} = require('../../../config/app');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const scheduleId = req.params.id;
    template.render({scheduleId, errors: false, values: {}}, res);
  },

  post(req, res, next) {
    const scheduleId = req.params.id;
    const values = req.body;
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
      const sanitisedSortCode = dashUpSortCode(sanitiseSortCode(sortCode));
      const body = {nameOnAccount, accountNumber, sortCode: sanitisedSortCode};

      got.put(bankAccountsApi, {body})
        .then(response => {
          const bankAccountId = JSON.parse(response.body).id;
          const date = (new Date()).toISOString();
          const body = {scheduleId, bankAccountId, date};

          return got.post(updateBankAccountApi, {body});
        })
        .then(() => res.redirect('/schedule/' + req.params.id))
        .catch(err => next(err));
    }
  }
};
