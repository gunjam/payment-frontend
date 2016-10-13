'use strict';

const apiUrl = process.env.API_URL || 'http://localhost:5000/api/';

module.exports = {
  bankAccountsApi: apiUrl + 'BankAccounts',
  updateBankAccountApi: apiUrl + 'Schedules/updateBankAccount',
  schedulesApi: apiUrl + 'Schedules',
  schedulesFullApi: apiUrl + 'Schedules/saveFull',
  updatePaymentsApi: apiUrl + 'Payments/update'
};
