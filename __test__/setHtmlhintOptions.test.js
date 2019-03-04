const setHtmlhintOptions = require('../src/lib/options/setHtmlhintOptions');

const options = {
  logToFile: false,
  vnu: {},
  htmlhint: {},
};

describe('it should throw error when it should', () => {
  test('it should throw error if there is unknown key in vnu options', () => {
    const badOpts = {
      htmlhint: {
        'tag-pai': true,
      },
    };

    try {
      setHtmlhintOptions(badOpts, options);
    } catch (error) {
      expect(error.message).toBe("Unknown key - 'tag-pai' in htmlhint options");
    }
  });

  test('it should throw error if there is non boolean value wich should be boolean in vnu options', () => {
    const badOpts = {
      htmlhint: {
        'tag-pair': 'true',
      },
    };

    try {
      setHtmlhintOptions(badOpts, options);
    } catch (error) {
      expect(error.message).toBe("Bad value in htmlhint options. Usage - 'tag-pair': boolean");
    }
  });

  test('it should throw error if "id-class-value" option set to wrong value', () => {
    const badOpts = {
      htmlhint: {
        'id-class-value': true,
      },
    };

    try {
      setHtmlhintOptions(badOpts, options);
    } catch (error) {
      expect(error.message.includes('Bad value \'true\' in htmlhint options.')).toBe(true);
    }
  });
  test('it should throw error if \'space-tab-mixed-disabled\' option set to wrong value', () => {
    const badOpts = {
      htmlhint: {
        'space-tab-mixed-disabled': true,
      },
    };

    try {
      setHtmlhintOptions(badOpts, options);
    } catch (error) {
      expect(error.message.includes('Bad value \'true\' in htmlhint options.')).toBe(true);
    }
  });
});
