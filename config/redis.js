module.exports = {
  host: process.env.REDIS_URL || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  prefix: 'payment-frontend',
  db: 0
};
