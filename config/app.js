'use strict';

const apiUrl = process.env.API_URL || 'http://localhost:5000/api/';

module.exports = {
  bankAccountsApi: apiUrl + 'BankAccounts',
  schedulesApi: apiUrl + 'Schedules',
  schedulesFullApi: apiUrl + 'Schedules/saveFull'
};
