'use strict';

const moment = require('moment');

const dateFormat = 'YYYY-MM-DD';

module.exports = function (dateOfClaim, dateOfDeath, rateOfPayment) {
  const initialAmount = (rateOfPayment === 'higher') ? 5000 : 2500;
  const monthlyAmount = (rateOfPayment === 'higher') ? 500 : 100;

  const startDate = moment(dateOfClaim).add(1, 'months').set('date', dateOfDeath.getDate());
  const monthsSinceDeath = moment(dateOfClaim).diff(dateOfDeath, 'months');

  const numberOfPayments = 17 - monthsSinceDeath;
  const schedule = [];

  if (monthsSinceDeath < 12) {
    schedule.push({
      amount: initialAmount,
      date: startDate.format(dateFormat)
    });
    startDate.add(1, 'months');
  }

  if (monthsSinceDeath < 1) {
    schedule.push({
      amount: monthlyAmount,
      date: startDate.format(dateFormat)
    });
  } else if (monthsSinceDeath < 2) {
    schedule.push({
      amount: monthlyAmount * 2,
      date: startDate.format(dateFormat)
    });
  } else {
    schedule.push({
      amount: monthlyAmount * 3,
      date: startDate.format(dateFormat)
    });
  }

  for (let i = 0; i < numberOfPayments; i++) {
    const payment = {
      amount: monthlyAmount,
      date: startDate.add(1, 'months').format(dateFormat)
    };
    schedule.push(payment);
  }
  return schedule;
};

function monthsBetween(date1, date2) {
  return date2.getMonth() - date1.getMonth() + ((date2.getFullYear() - date1.getFullYear()) * 12);
}
