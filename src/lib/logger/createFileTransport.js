const { mkdirSync, existsSync, createWriteStream } = require('fs');
const path = require('path');
const winston = require('winston');

module.exports = function createFileTransport(options, logger) {
  const { combine } = winston.format;
  const { logToFile } = options;

  if (logToFile) {
    const delimiter = logToFile.match(/\/|\\/g);
    const splittedPath = logToFile.split(delimiter[0]);
    splittedPath.pop();
    const dirPath = splittedPath.join('/');

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
    logger.add(
      new winston.transports.Stream({
        format: combine(winston.format.json()),
        stream: createWriteStream(path.resolve(logToFile), {
          flags: 'a+'
        })
      })
    );
  }
};
