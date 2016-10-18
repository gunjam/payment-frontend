'use strict';

const formatDate = require('../../lib/format-date');

exports.renderer = function (input, out) {
  const reqLang = (out.global.events.req || {}).language;
  const dateLang = (reqLang === 'cy') ? 'cy' : 'en';
  const date = input.date ? new Date(input.date) : new Date();
  const dateString = formatDate(date, dateLang);

  out.write(`<time datetime="${date.toISOString()}">${dateString}</time>`);
};
