import * as moment from 'moment';
import * as winston from 'winston';
import config from '../config';

const myConsoleFormat = winston.format.printf(
  (info) => `${moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')} - ${info.level}: ${info.message}`,
);

const logger: winston.Logger = winston.createLogger({
  // format: winston.format.json(),
  level: config.log.level,
  transports: [
    new winston.transports.Console(
      {
        format: winston.format.combine(winston.format.colorize(), myConsoleFormat),
      },
    ),
  ],
});

if (config.log.file.enable) {
  logger.add(
    new winston.transports.File(
      {
        filename: config.log.file.name,
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      },
    ),
  );
}

export default logger;
