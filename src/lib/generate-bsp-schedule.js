'use strict';

const tomorrow = require('./tomorrow');

const monthsToGetInitalPayment = 12;
const initialHigher = 5000;
const initialStandard = 2500;
const monthlyHigher = 500;
const monthlyStandard = 100;
const maxMonthlyPayments = 18;
const maxMonthsBackDated = 3;

function getPayableDates(dateOfClaim, dateOfDeath, dateOfPensionAge, rateOfPayment) {
  const initialAmount = rateOfPayment === 'higher' ? initialHigher : initialStandard;
  const monthlyAmount = rateOfPayment === 'higher' ? monthlyHigher : monthlyStandard;

  const nextDay = tomorrow();
  const firstPayDate = nextClosestPayDate(dateOfClaim, dateOfDeath.getDate());
  const monthsSinceDeath = monthsBetween(dateOfDeath, dateOfClaim);
  const eligibleMonths = Math.min(maxMonthlyPayments, monthsBetween(dateOfDeath, dateOfPensionAge));

  const numberOfPayments = eligibleMonths - monthsSinceDeath;
  const initialPayment = monthsSinceDeath < monthsToGetInitalPayment ? [{amount: initialAmount, date: nextDay}] : [];
  const backDatedPayments = monthsSinceDeath > 0 && monthsSinceDeath < maxMonthlyPayments + maxMonthsBackDated ? [{amount: getBackDatedPayments(monthlyAmount, monthsSinceDeath), date: nextDay}] : [];
  const monthlyPayments = getMonthlyPayments(firstPayDate, monthlyAmount, numberOfPayments);

  return [...initialPayment, ...backDatedPayments, ...monthlyPayments];
}

function getBackDatedPayments(monthlyAmount, monthsSinceDeath) {
  return monthlyAmount * (monthsSinceDeath < maxMonthlyPayments ? Math.min(monthsSinceDeath, maxMonthsBackDated) : maxMonthsBackDated - (monthsSinceDeath - maxMonthlyPayments));
}

function getMonthlyPayments(date, amount, numberOfPayments, ...payments) {
  return numberOfPayments < 1 ? payments : getMonthlyPayments(nextClosestPayDate(date), amount, numberOfPayments - 1, ...payments, {amount, date});
}

function monthsBetween(date1, date2) {
  return date2.getMonth() - date1.getMonth() + ((date2.getFullYear() - date1.getFullYear()) * 12) - (date2.getDate() - date1.getDate() < 1 ? 1 : 0);
}

function nextClosestPayDate(date, payDay = date.getDate()) {
  const nextMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, payDay));
  return nextMonth.getDate() === payDay ? nextMonth :
    nextClosestPayDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), payDay - 1)));
}

module.exports = getPayableDates;
