let { formatTemplate } = require('../src/lib/logger/formatTemplate.js');

const path = 'file:/path/index.html';
const place = 'From line: 9 column: 9';

const withInfoLevel = {
  timestamp: '2019:29:05 08:07:06',
  level: 'info',
  message: 'message',
  meta: {
    path,
    place,
  },
};

const withErrorLevel = {
  timestamp: '2019:29:05 08:07:06',
  level: 'error',
  message: 'message',
  meta: {
    path,
    place,
  },
};
const withSuccesLevel = {
  timestamp: '2019:29:05 08:07:06',
  level: 'success',
  message: 'message',
  meta: {
    path,
    place,
  },
};
const withUnknownLevelWithoutPlace = {
  timestamp: '2019:29:05 08:07:06',
  level: 'unknown',
  message: 'message',
  meta: {
    path,
  },
};

describe('Test formatTemplate function', () => {
  beforeAll(() => {
    formatTemplate = jest.fn(formatTemplate);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('', () => {
    const formattedInfo = formatTemplate(withInfoLevel);
    const formattedError = formatTemplate(withErrorLevel);
    const formattedSucces = formatTemplate(withSuccesLevel);
    const formattedUnknown = formatTemplate(withUnknownLevelWithoutPlace);

    expect(formattedInfo).toContain('info');
    expect(formattedInfo).toContain(withInfoLevel.message);
    expect(formattedInfo).toContain(withInfoLevel.timestamp);
    expect(formattedError).toContain('error');
    expect(formattedError).toContain(withErrorLevel.message);
    expect(formattedError).toContain(withErrorLevel.timestamp);
    expect(formattedSucces).toContain('success');
    expect(formattedSucces).toContain(withSuccesLevel.message);
    expect(formattedSucces).toContain(withSuccesLevel.timestamp);
    expect(formattedUnknown).toContain('unknown');
    expect(formattedUnknown).toContain(withUnknownLevelWithoutPlace.timestamp);
    expect(formattedUnknown).toContain(withUnknownLevelWithoutPlace.message);
  });
});
