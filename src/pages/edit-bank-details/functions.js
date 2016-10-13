'use strict';

const rp = require('request-promise');
const isEmpty = require('../../utils/is-empty');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const {bankAccountsApi, updateBankAccountApi} = require('../../../config/app');
const sanitiseSortCode = require('../../utils/sanitise-sort-code');
const dashUpSortCode = require('../../utils/dash-up-sort-code');
const template = require('./template.marko');

const PUT = 'PUT';
const POST = 'POST';
const json = true;

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
      const bankAccount = {nameOnAccount, accountNumber, sortCode: sanitisedSortCode};

      rp({method: PUT, uri: bankAccountsApi, json, body: bankAccount})
        .then(body => {
          const bankAccountId = body.id;
          const date = new Date();
          const data = {scheduleId, bankAccountId, date};

          rp({method: POST, uri: updateBankAccountApi, json, body: data})
            .then(() => res.redirect('/schedule/' + req.params.id))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  }
};
