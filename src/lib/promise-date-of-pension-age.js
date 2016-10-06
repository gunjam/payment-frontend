'use strict';

const rp = require('request-promise');

const pensionDate = /You’ll reach State Pension age on +(\d{1,2} \w{3,9} \d{4})/;

module.exports = function (birthDate, sex) {
  return rp({
    uri: `https://www.gov.uk/state-pension-age/y/age/${birthDate}/${sex}`,
    method: 'GET',
    headers: {'user-agent': 'Mozilla/5.0'},
    transform: body => new Date(body.match(pensionDate)[1])
  }).promise();
};
