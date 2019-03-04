const winston = require('winston');
const { formatTemplate } = require('./formatTemplate');

const { printf, splat, combine, timestamp, colorize } = winston.format;

const formatter = printf(formatTemplate);

const logger = winston.createLogger({
  levels: {
    success: 0,
    error: 1,
    info: 2
  },
  format: combine(splat(), timestamp({ format: 'YYYY-mm-dd hh:mm:ss' }), winston.format.simple()),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), formatter)
    })
  ]
});

winston.addColors({
  success: 'green',
  error: 'red',
  info: 'yellow'
});

module.exports = logger;
