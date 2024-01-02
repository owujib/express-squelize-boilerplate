import path from 'path';
import Winston from 'winston';

const logPath = path.join(__dirname, '../logs/app.log');
const errorPath = path.join(__dirname, '../logs/error.log');


const infoOptions = {
  level: 'info',
  filename: logPath,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
};

const errorOptions = {
  level: 'error',
  filename: errorPath,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,

  colorize: false,
};

const consoleOptions = {
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logs: any = Winston.createLogger({
  transports: [
    new Winston.transports.File({ ...infoOptions }),
    new Winston.transports.File({ ...errorOptions }),
    new Winston.transports.Console({
      ...consoleOptions.console,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logs.stream = {
  write(message: string, encoding: any) {
    logs.info(message);
  },
};

/**
 * @description methods helps take all server error events or message and transport to logs file
 */
const customLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File({ ...errorOptions }),
  ],
});
export default logs;
export const Logger = customLogger;
