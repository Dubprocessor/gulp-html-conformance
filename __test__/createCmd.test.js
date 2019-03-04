const createCmd = require('../src/lib/createCmd');
const options = require('./fixtures/options');

describe('test createCmd', () => {
  test('', () => {
    options.vnu.Werror = true;
    options.vnu.format = 'text';
    options.vnu.filterfile = './.filter';
    options.vnu.filterpattern = '.*name.*';
    options.vnu['user-agent'] = 'Validator.nu/LV';
    const cmd = createCmd(options);
    expect(cmd).toContain('Werror');
    expect(cmd).toContain('json');
    expect(cmd).toContain('./.filter');
    expect(cmd).toContain('.*name.*');
    expect(cmd).not.toContain('Validator.nu/LV');
  });
});
