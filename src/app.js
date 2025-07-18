const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(morgan('combined'));

// Custom logger middleware
app.use(logger);

// API routes
app.use(config.apiPrefix, routes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Welcome to Freedom Librairies API',
    version: '1.0.0',
    documentation: `${req.protocol}://${req.get('host')}${config.apiPrefix}/health`,
    endpoints: {
      health: `${config.apiPrefix}/health`,
      weapons: `${config.apiPrefix}/weapons`,
      weaponByName: `${config.apiPrefix}/weapons/:name`,
      searchWeapons: `${config.apiPrefix}/weapons/search?q=:query`
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: [
      `${config.apiPrefix}/health`,
      `${config.apiPrefix}/weapons`,
      `${config.apiPrefix}/weapons/:name`
    ]
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;