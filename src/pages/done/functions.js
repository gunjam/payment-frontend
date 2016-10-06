'use strict';

const template = require('./template.marko');

module.exports = {
  get(req, res) {
    const {scheduleId} = req.getSession('done');
    req.session.destroy();

    if (scheduleId) {
      template.render({scheduleId}, res);
    } else {
      res.redirect('/');
    }
  }
};
