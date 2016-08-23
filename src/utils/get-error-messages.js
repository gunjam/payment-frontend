'use strict';

module.exports = function (name, codes, req) {
  return Object.keys(codes).reduce((errors, code) => {
    errors[code] = req.t(`${name}:form.${code}.errors.${codes[code][0]}`);
    return errors;
  }, {});
};
