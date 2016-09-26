'use strict';

const months = {
  en: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  cy: [
    'Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf',
    'Awst', 'Medi', 'Hydref', 'Tachwedd', 'Rhagfyr'
  ]
};

module.exports = function (date, lang = 'en') {
  return `${date.getDate()} ${months[lang][date.getMonth()]} ${date.getFullYear()}`;
};
