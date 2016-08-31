'use strict';

const moment = require('moment');

const maxMonthlyPayments = 17;
const dateFormat = 'YYYY-MM-DD';

module.exports = function (dateOfClaim, dateOfDeath, dateOfPensionAge, rate) {
  const schedule = [];
  const initialAmount = (rate === 'higher') ? 5000 : 2500;
  const monthlyAmount = (rate === 'higher') ? 500 : 100;

  const payDate = moment(dateOfClaim).add(1, 'months').set('date', dateOfDeath.getDate());
  const monthsTillPensionable = moment(dateOfPensionAge).diff(dateOfClaim, 'months');
  const monthsSinceDeath = moment(dateOfClaim).diff(dateOfDeath, 'months');

  const numberOfPayments = Math.min(maxMonthlyPayments - monthsSinceDeath, monthsTillPensionable - 2);

  if (monthsSinceDeath < 12) {
    schedulePayment(schedule, initialAmount, payDate);
  }

  if (monthsTillPensionable > 1) {
    const firstMonthlyPayment = monthsSinceDeath < 1 ? monthlyAmount :
      monthlyAmount * Math.min(monthsSinceDeath + 1, 3);
    schedulePayment(schedule, firstMonthlyPayment, payDate);
  }

  for (let i = 0; i < numberOfPayments; i++) {
    schedulePayment(schedule, monthlyAmount, payDate);
  }
  return schedule;
};

function schedulePayment(schedule, amount, moment) {
  schedule.push({
    amount,
    date: moment.format(dateFormat)
  });
  moment.add(1, 'months');
}

function monthsBetween(date1, date2) {
  return date2.getMonth() - date1.getMonth() + ((date2.getFullYear() - date1.getFullYear()) * 12);
}

// function getPayDat
