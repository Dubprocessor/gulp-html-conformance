const opts = require('./fixtures/options');
const setOptions = require('../src/lib/options/setOptions');

describe('test setOptions function', () => {
  test('options should be set', () => {
    const result = setOptions(opts);
    expect(result).toEqual(opts);
  });
  test('it should throw error if there is unknown key', () => {
    const badKey = 'logTofil';
    opts[badKey] = './path/file.log';
    try {
      setOptions(opts);
    } catch (error) {
      expect(error.message).toBe('Unknown key - "logTofil" in options');
    }
  });
});
