'use strict';

const redis = require('url').parse(process.env.REDIS_URL || 'localhost:6379');

console.log(redis);

module.exports = {
  host: redis.hostname,
  port: redis.port,
  prefix: 'payment-frontend',
  db: 0
};
