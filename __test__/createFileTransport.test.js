jest.mock('fs');
const logger = jest.mock('../src/lib/logger/logger');
const createFileTransport = require('../src/lib/logger/createFileTransport');

describe('', () => {
  const options = {};

  beforeEach(() => {
    const add = jest.fn(() => {});
    logger.add = add;
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('logger should add fileTransport if logToFile option is set', () => {
    options.logToFile = './path/file.log';
    createFileTransport(options, logger);
    expect(logger.add).toBeCalled();
  });
  test('logger should not add fileTransport if logToFile option is not set', () => {
    options.logToFile = false;
    createFileTransport(options, logger);
    expect(logger.add).not.toBeCalled();
  });
  test('mkdirSync should not be called if directory allready exists', () => {
    options.logToFile = './path/file.log';
    createFileTransport(options, logger);
    expect(require('fs').existsSync).toHaveBeenCalledWith('./path');
    expect(require('fs').existsSync).toHaveReturnedWith(true);
    expect(require('fs').mkdirSync).not.toBeCalled();
  });
  test('mkdirSync should be called if directory does not exist', () => {
    options.logToFile = './nonexisten/file.log';
    createFileTransport(options, logger);
    expect(require('fs').existsSync).toHaveBeenCalledWith('./nonexisten');
    expect(require('fs').existsSync).toHaveReturnedWith(false);
    expect(require('fs').mkdirSync).toBeCalled();
    expect(require('fs').mkdirSync).toHaveBeenCalledWith('./nonexisten', { recursive: true });
  });
});
