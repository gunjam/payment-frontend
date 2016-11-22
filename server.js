'use strict';
require('marko/node-require').install();

const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const csrf = require('csurf');
const express = require('express');
const helmet = require('helmet');
const i18next = require('i18next');
const FilesystemBackend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionHelpers = require('./src/lib/session-helpers');

// Configure Lasso.js
require('lasso').configure(require('./config/lasso'));

// Reload template on changes
if (process.env.NODE_ENV !== 'production') {
  const viewsDir = path.join(__dirname, 'src');
  require('marko/hot-reload').enable();
  require('marko/browser-refresh').enable();
  require('lasso/browser-refresh').enable();
  require('fs').watch(viewsDir, {recursive: true}, (event, filename) => {
    if (/\.marko$/.test(filename)) {
      const templatePath = path.join(viewsDir, filename);
      console.log('Marko template modified: ', templatePath);
      require('marko/hot-reload').handleFileModified(templatePath);
    }
  });
}

// Setup i18next
i18next
  .use(FilesystemBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(require('./config/i18next'));

const app = express();
const port = process.env.PORT || 4000;

// Enable compression
app.use(compression());

// Disable x-powered-by header
app.disable('x-powered-by');

// Uptime ping end point
app.get('/ping', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('pong');
});

// Serve static assets
app.use(require('lasso/middleware').serveStatic());

// Setup redis session
const sessionConfig = require('./config/session');
sessionConfig.store = new RedisStore(require('./config/redis'));

app.set('trust proxy', 1);
app.use(session(sessionConfig));
app.use(sessionHelpers);

// Load Middleware
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.urlencoded({extended: true}));
app.use(csrf());
app.use(helmet(require('./config/helmet')));

// Set Content-Type header to text to make compression work for output stream
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});

// Page routes
app.use('/', require('./src/pages/start'));
app.use('/make-a-bsp-payment', require('./src/pages/bsp'));
app.use('/confirmation', require('./src/pages/confirmation'));
app.use('/done', require('./src/pages/done'));
app.use('/search', require('./src/pages/search'));
app.use('/schedule', require('./src/pages/schedule'));
app.use('/stop-schedule', require('./src/pages/stop-schedule'));
app.use('/edit-bank-details', require('./src/pages/edit-bank-details'));

// Error pages
app.use(require('./src/pages/404'));
app.use(require('./src/pages/500'));

// Listen!
app.listen(port, err => {
  if (err) {
    throw err;
  }

  console.log('Listening on port %d', port);

  if (process.send) {
    process.send('online');
  }
});
