'use strict';

module.exports = function (sortcode) {
  const firstTwo = sortcode.slice(0, 2);

  if (firstTwo === '01') {
    return 'National Westminster';
  } else if (firstTwo === '05') {
    return 'Clydesdale Bank    trading as Yorkshire Bank';
  } else if (firstTwo === '07') {
    return 'Nationwide Building Society    ';
  } else if (firstTwo === '08') {
    return 'The Co-operative Bank';
  } else if (firstTwo === '09') {
    return 'Santander';
  } else if (firstTwo === '10') {
    return 'Bank of England';
  } else if (firstTwo === '11') {
    return 'Bank of Scotland';
  } else if (firstTwo === '12') {
    return 'Sainsbury\'s Bank';
  } else if (firstTwo === '13' || firstTwo === '14') {
    return 'Barclays Bank';
  } else if (parseInt(firstTwo, 10) >= 15 && parseInt(firstTwo, 10) <= 19) {
    return 'The Royal Bank of Scotland';
  } else if (parseInt(firstTwo, 10) >= 20 && parseInt(firstTwo, 10) <= 29) {
    return 'Barclays Bank';
  } else if (parseInt(firstTwo, 10) >= 30 && parseInt(firstTwo, 10) <= 39) {
    return 'Lloyds Bank or TSB';
  } else if (parseInt(firstTwo, 10) >= 40 && parseInt(firstTwo, 10) <= 49) {
    return 'HSBC';
  } else if (parseInt(firstTwo, 10) >= 50 && parseInt(firstTwo, 10) <= 66) {
    return 'National Westminster Bank';
  } else if (firstTwo === '72') {
    return 'Santander';
  } else if (firstTwo === '77') {
    return 'Lloyds Bank and TSB';
  } else if (firstTwo === '80' || firstTwo === '81') {
    return 'Bank of Scotland';
  } else if (firstTwo === '82') {
    return 'Clydesdale Bank';
  } else if (firstTwo === '83' || firstTwo === '84' || firstTwo === '86') {
    return 'The Royal Bank of Scotland';
  } else if (firstTwo === '87') {
    return 'TSB';
  } else if (firstTwo === '89') {
    return 'Santander';
  } else if (firstTwo === '90') {
    return 'Bank of Ireland';
  } else if (firstTwo === '91') {
    return 'Danske Bank';
  } else if (firstTwo === '93') {
    return 'Allied Irish Banks';
  } else if (firstTwo === '94') {
    return 'Bank of Ireland';
  } else if (firstTwo === '95') {
    return 'Danske Bank';
  } else if (firstTwo === '98') {
    return 'Ulster Bank';
  }
  return 'Other Bank';
};
