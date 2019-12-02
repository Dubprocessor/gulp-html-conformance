const setVnuOptions = require('../src/lib/options/setVnuOptions');
const opts = require('./fixtures/options');
const defaultOptions = require('../src/lib/options/defaulOptions');

describe('setVnuOptions', () => {
  test('it should set vnu options if opts object is ok', () => {
    const assigned = setVnuOptions(opts, defaultOptions);
    expect(assigned.vnu).toEqual(defaultOptions.vnu);
  });

  test('default options should not be changed', () => {
    const badDefaultOptions = {
      vnu: {
        format: 'text',
        version: true,
        verbose: true,
        'user-agent': 'some validator'
      }
    };
    const assigned = setVnuOptions(badDefaultOptions, defaultOptions);

    expect(assigned.vnu.format).toBe('json');
    expect(assigned.vnu.version).toBe(false);
    expect(assigned.vnu.verbose).toBe(false);
    expect(assigned.vnu['user-agent']).toBe('Validator.nu/LV');
  });

  describe('it should throw error when it should', () => {
    test('it should throw error if there is unknown key in vnu options', () => {
      const badOpts = {
        vnu: {
          Werr: false
        }
      };

      try {
        setVnuOptions(badOpts, defaultOptions);
      } catch (error) {
        expect(error.message).toBe("Unknown key - 'Werr' in vnu options");
      }
    });

    test('it should throw error if there is non boolean value that should be boolean in vnu options', () => {
      const badOpts = {
        vnu: {
          Werror: 'false'
        }
      };

      try {
        setVnuOptions(badOpts, defaultOptions);
      } catch (error) {
        expect(error.message).toBe("Bad value in vnu options. Usage - 'Werror': boolean");
      }
    });
  });

  test('it should throw error if filterfile option is set, but there is no such a file', () => {
    const badOpts = {
      vnu: {
        filterfile: './path/.nonexistentfile'
      }
    };

    try {
      setVnuOptions(badOpts, defaultOptions);
    } catch (error) {
      expect(error.message.includes('Bad value for "filterfile" in vnu options.')).toBe(true);
    }
  });

  test("it should throw error if filterpattern option format is differenrt from '.*word.*'", () => {
    const badOpts = {
      vnu: {
        filterpattern: 'word'
      }
    };

    try {
      setVnuOptions(badOpts, defaultOptions);
    } catch (error) {
      expect(error.message.includes('Bad value for "filterpattern" in vnu options.')).toBe(true);
    }
  });

  test('it should not throw for filterpattern wich properly formatted', () => {
    const goodOpts = {
      vnu: {
        filterpattern: '.*word.*'
      }
    };
    const assigned = setVnuOptions(goodOpts, defaultOptions);
    expect(assigned.vnu.filterpattern).toBe('.*word.*');
  });
});
