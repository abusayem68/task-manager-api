const express = require('express');
const router = require('./src/routes/api');
const app = express();

// Security middleware lib import
const { rateLimit } = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');

// database lib import
const mongoose = require('mongoose');

// Security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 });
app.use(limiter);

// MongoDB Database connection

// routing implement
app.use('/api/v1', router);

// Undefined route implement
app.use('*', (req, res) => {
  res.status(404).json({ Status: 'failed', data: 'Not found!' });
});

module.exports = app;
