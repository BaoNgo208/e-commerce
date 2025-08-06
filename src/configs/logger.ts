import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, endpoint, ...meta }) => {
    const metaStr = Object.entries(meta)
      .map(([key, val]) => `${key}=${val}`)
      .join(' ');
    return `${timestamp} [${level}]: ${message}${endpoint ? ` endpoint=${endpoint}` : ''}${metaStr ? ' ' + metaStr : ''}`;
  })
);

const orderedJsonFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
  const logObject = {
    timestamp,
    level,
    message,
    ...meta
  };
  return JSON.stringify(logObject, null, 2);
});

const fileFormat = winston.format.combine(winston.format.timestamp(), orderedJsonFormat);

winston.loggers.add('ProductSectionLogger', {
  level: 'debug',
  format: winston.format.errors({ stack: true }),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: consoleFormat
    }),
    new winston.transports.File({
      filename: 'product-section.log',
      level: 'warn',
      format: fileFormat
    })
  ],
  defaultMeta: { service: 'ProductSectionLogger' }
});

winston.loggers.add('ProductLogger', {
  level: 'debug',
  format: winston.format.errors({ stack: true }),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: consoleFormat
    }),
    new winston.transports.File({
      filename: 'product.log',
      level: 'error',
      format: fileFormat
    })
  ],
  defaultMeta: { service: 'ProductLogger' }
});

export const productSectionLogger = winston.loggers.get('ProductSectionLogger');
export const productLogger = winston.loggers.get('ProductLogger');
