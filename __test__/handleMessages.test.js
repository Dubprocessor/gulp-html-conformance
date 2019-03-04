jest.unmock('winston');

const handleMessages = jest.fn(require('../src/lib/handleMessages'));
const logger = require('../src/lib/logger/logger');

const path = '/path/index.html';
const hint = [];

const expectedMessage = {
  level: 'level',
  message: 'message',
  meta: { path, place: 'From line: 9 column: 9' }
};
const messageWithNonEmptyArray = JSON.stringify({
  messages: [
    {
      type: 'level',
      message: 'message',
      lastLine: '9',
      lastColumn: '9'
    },
    {
      type: 'level',
      message: 'message',
      lastLine: '9',
      lastColumn: '9'
    }
  ]
});
const nonEmptyHint = [
  {
    type: 'level',
    message: 'message',
    line: '9',
    col: '9'
  },
  {
    type: 'level',
    message: 'message',
    line: '9',
    col: '9'
  }
];
const expectedSuccessMessage = {
  level: 'success',
  message: 'Document checking completed. No errors found.',
  meta: { path: '/path/index.html' }
};

describe(`Test handleMessages.
    Messages come from vnu as array of objects in json format,
    they should be parsed and then logger should be called for each message`, () => {
  beforeEach(() => {
    const log = jest.fn();
    logger.log = log;
  });

  test('empty array from vnu and htmlhint', () => {
    const messageWithEmptyArray = JSON.stringify({ messages: [] });
    handleMessages(messageWithEmptyArray, path, hint);
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(expectedSuccessMessage);
  });
  test('non empty array from vnu and htmlhint', () => {
    handleMessages(messageWithNonEmptyArray, path, nonEmptyHint);
    expect(logger.log).toHaveBeenCalledTimes(4);
    expect(logger.log).toHaveBeenCalledWith(expectedMessage);
  });
  test("if type 'warn' in message, level should be set to 'info'", () => {
    const withLevelWarning = [
      {
        type: 'warn',
        message: 'message',
        line: '9',
        col: '9'
      },
      {
        type: 'warn',
        message: 'message',
        line: '9',
        col: '9'
      }
    ];
    const expectedMessageWithWarningLevel = {
      level: 'info',
      message: 'message',
      meta: { path, place: 'From line: 9 column: 9' }
    };
    handleMessages(messageWithNonEmptyArray, path, withLevelWarning);
    expect(logger.log).toHaveBeenCalledTimes(4);
    expect(logger.log).toHaveBeenCalledWith(expectedMessageWithWarningLevel);
  });
});
