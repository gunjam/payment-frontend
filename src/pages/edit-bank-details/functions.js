'use strict';

const rp = require('request-promise');
const isEmpty = require('../../utils/is-empty');
const isValidSortCode = require('../../utils/is-valid-sort-code');
const isValidAccountNumber = require('../../utils/is-valid-account-number');
const {bankAccountsApi, updatePaymentsApi} = require('../../../config/app');
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
    const {nameOnAccount, accountNumber, sortCode1, sortCode2, sortCode3} = values;
    const errors = {};
    const sortCode = `${sortCode1}-${sortCode2}-${sortCode3}`;

    if (isEmpty(nameOnAccount)) {
      errors.nameOnAccount = req.t('bsp:form.nameOnAccount.errors.presence');
    }

    if (isEmpty(sortCode1) && isEmpty(sortCode2) && isEmpty(sortCode3)) {
      errors.sortCode = req.t('bsp:form.sortCode.errors.presence');
    } else if (!isValidSortCode(sortCode)) {
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
      const bankAccount = {nameOnAccount, accountNumber, sortCode};

      rp({method: PUT, uri: bankAccountsApi, json, body: bankAccount})
        .then(body => {
          const bankAccountId = body.id;
          const uri = `${updatePaymentsApi}?where={"and": [` +
            `{"scheduleId": "${scheduleId}"},` +
            `{"date": {"gt": "${new Date()}"}}]}`;

          rp({method: POST, uri, json, body: {bankAccountId}})
            .then(() => res.redirect('/schedule/' + req.params.id))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  }
};
