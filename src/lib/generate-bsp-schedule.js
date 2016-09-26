'use strict';

const monthsToGetInitalPayment = 12;
const initialHigher = 5000;
const initialStandard = 2500;
const monthlyHigher = 500;
const monthlyStandard = 100;
const maxMonthlyPayments = 18;
const maxMonthsBackDated = 3;
const initial = 'initial';
const backDated = 'backDated';
const monthly = 'monthly';

function getPaymentSchedule(dateOfClaim, dateOfDeath, dateOfPensionAge, higherRate, startDate = dateOfClaim) {
  const initialAmount = higherRate ? initialHigher : initialStandard;
  const monthlyAmount = higherRate ? monthlyHigher : monthlyStandard;

  const firstPayDate = nextClosestPayDate(startDate, dateOfDeath.getDate());
  const monthsSinceDeath = monthsBetween(dateOfDeath, dateOfClaim);

  return [
    ...getInitialPayment(monthsSinceDeath, initialAmount, startDate),
    ...getBackDatedPayments(monthsSinceDeath, monthlyAmount, startDate),
    ...getMonthlyPayments(
        firstPayDate, monthlyAmount,
        getNumberOfPayments(dateOfDeath, dateOfPensionAge, monthsSinceDeath)
      )
  ];
}

function getNumberOfPayments(dateOfDeath, dateOfPensionAge, monthsSinceDeath) {
  return Math.min(maxMonthlyPayments, monthsBetween(dateOfDeath, dateOfPensionAge)) - monthsSinceDeath;
}

function getInitialPayment(monthsSinceDeath, amount, date) {
  return monthsSinceDeath < monthsToGetInitalPayment ? [{amount, date, type: initial}] : [];
}

function getBackDatedPayments(monthsSinceDeath, monthlyAmount, date) {
  const amount = monthlyAmount * (monthsSinceDeath < maxMonthlyPayments ? Math.min(monthsSinceDeath, maxMonthsBackDated) : maxMonthsBackDated - (monthsSinceDeath - maxMonthlyPayments));
  return monthsSinceDeath > 0 && monthsSinceDeath < maxMonthlyPayments + maxMonthsBackDated ? [{amount, date, type: backDated}] : [];
}

function getMonthlyPayments(date, amount, numberOfPayments, ...payments) {
  return numberOfPayments < 1 ? payments : getMonthlyPayments(nextClosestPayDate(date), amount, numberOfPayments - 1, ...payments, {amount, date, type: monthly});
}

function monthsBetween(date1, date2) {
  return date2.getMonth() - date1.getMonth() + ((date2.getFullYear() - date1.getFullYear()) * 12) - (date2.getDate() - date1.getDate() < 1 ? 1 : 0);
}

function nextClosestPayDate(date, payDay = date.getDate()) {
  const nextMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, payDay));
  return nextMonth.getDate() === payDay ? nextMonth : nextClosestPayDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), payDay - 1)));
}

module.exports = getPaymentSchedule;
