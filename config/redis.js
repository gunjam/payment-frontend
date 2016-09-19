module.exports = {
  host: process.env.REDIS_URL || 'localhost',
  prefix: 'payment-frontend',
  db: 0
};
