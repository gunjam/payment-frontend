'use strict';

const rp = require('request-promise');
const getErrorMessages = require('../../utils/get-error-messages');
const getDateFromDateObject = require('../../utils/get-date-from-date-object');
const removeEmpties = require('../../utils/remove-empties');
const template = require('./template.marko');

const paymentPUT = {
  method: 'PUT',
  uri: 'http://localhost:3000/api/payments',
  json: true
};

module.exports = {
  get(req, res) {
    template.render({errors: false, values: false}, res);
  },

  post(req, res) {
    const values = req.body;
    const {sortCode1, sortCode2, sortCode3, dateOfPayment} = values;

    paymentPUT.body = removeEmpties(values);
    paymentPUT.body.monthlyPayment = 1;
    paymentPUT.body.nationalInsuranceNumber = paymentPUT.body.nationalInsuranceNumber.replace(/\s/g, '').toUpperCase();
    paymentPUT.body.sortCode = `${sortCode1}${sortCode2}${sortCode3}`;
    paymentPUT.body.dateOfPayment = getDateFromDateObject(dateOfPayment);

    rp(paymentPUT)
      .then(() => res.redirect('/confirmation'))
      .catch(err => {
        const codes = err.error.error.details.codes;
        const errors = getErrorMessages('pay', codes, req);
        template.render({errors, values}, res);
      });
  }
};
