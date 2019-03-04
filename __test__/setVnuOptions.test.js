const setVnuOptions = require('../src/lib/options/setVnuOptions');

const options = {
  logToFile: false,
  vnu: {
    format: 'json',
  },
  htmlhint: {},
};

describe('it should throw error when it should', () => {
  test('it should throw error if there is unknown key in vnu options', () => {
    const badOpts = {
      vnu: {
        Werr: false,
      },
    };

    try {
      setVnuOptions(badOpts, options);
    } catch (error) {
      expect(error.message).toBe("Unknown key - 'Werr' in vnu options");
    }
  });

  test('it should throw error if there is non boolean value wich should be boolean in vnu options', () => {
    const badOpts = {
      vnu: {
        Werror: 'false',
      },
    };

    try {
      setVnuOptions(badOpts, options);
    } catch (error) {
      expect(error.message).toBe("Bad value in vnu options. Usage - 'Werror': boolean");
    }
  });
});

test('it should throw error if filterfile option set, but there is no such a file', () => {
  const badOpts = {
    vnu: {
      filterfile: './path/.nonexistentfile',
    },
  };

  try {
    setVnuOptions(badOpts, options);
  } catch (error) {
    expect(error.message.includes('Bad value for "filterfile" in vnu options.')).toBe(true);
  }
});
test('it should throw error if filterpattern option format is differenrt from \'.*word.*\'', () => {
  const badOpts = {
    vnu: {
      filterpattern: 'word',
    },
  };

  try {
    setVnuOptions(badOpts, options);
  } catch (error) {
    expect(error.message.includes('Bad value for "filterpattern" in vnu options.')).toBe(true);
  }
});
test('it should not throw for filterpattern wich properly formatted', () => {
  const goodOpts = {
    vnu: {
      filterpattern: '.*word.*',
    },
  };
  const result = setVnuOptions(goodOpts, options);
  expect(result).toEqual({
    logToFile: false,
    vnu: { format: 'json', filterpattern: '.*word.*' },
    htmlhint: {},
  });
});
