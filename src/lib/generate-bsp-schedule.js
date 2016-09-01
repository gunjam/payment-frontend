'use strict';

function getPayableDates(dateOfClaim, dateOfDeath, dateOfPensionAge, rate) {
  const initialAmount = (rate === 'higher') ? 5000 : 2500;
  const monthlyAmount = (rate === 'higher') ? 500 : 100;

  const monthsTillPensionable = monthsBetween(dateOfClaim, dateOfPensionAge);
  const monthsSinceDeath = monthsBetween(dateOfDeath, dateOfClaim);
  const numberOfPayments = Math.min(17 - monthsSinceDeath, monthsTillPensionable - 2);
  const dayOfDeath = dateOfDeath.getDate();
  const schedule = [];

  const payableDate = dateOfClaim;

  if (monthsSinceDeath < 12) {
    addPayment(schedule, payableDate, dayOfDeath, initialAmount);
  }

  if (monthsTillPensionable > 1) {
    const firstPayment = firstMonthlyPayment(monthlyAmount, monthsSinceDeath);
    addPayment(schedule, payableDate, dayOfDeath, firstPayment);
  }

  for (let i = 0; i < numberOfPayments; i++) {
    addPayment(schedule, payableDate, dayOfDeath, monthlyAmount);
  }

  return schedule;
}

function nextClosestPayDate(date, payDay) {
  const nextDate = new Date(date.getFullYear(), date.getMonth(), payDay);
  if (nextDate.getMonth() !== date.getMonth()) {
    return nextClosestPayDate(date, payDay - 1);
  }
  date.setUTCDate(payDay);
  date.setUTCMonth(date.getMonth() + 1);
}

function addPayment(schedule, payDate, payDay, amount) {
  nextClosestPayDate(payDate, payDay);
  schedule.push({amount, date: new Date(payDate)});
}

function firstMonthlyPayment(monthlyAmount, monthsSinceDeath) {
  return monthsSinceDeath < 1 ? monthlyAmount : monthlyAmount * Math.min(monthsSinceDeath + 1, 3);
}

function monthsBetween(date1, date2) {
  return date2.getMonth() - date1.getMonth() + ((date2.getFullYear() - date1.getFullYear()) * 12);
}

module.exports = getPayableDates;
