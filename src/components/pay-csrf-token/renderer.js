'use strict';

module.exports = function (input, out) {
  const csrfToken = out.global.events.req.csrfToken();
  out.write(`<input type="hidden" name="_csrf" value="${csrfToken}"/>`);
};
