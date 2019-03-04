const { execSync } = require('child_process');
const { existsSync } = require('fs');

describe('End to end test.', () => {
  beforeAll(() => {
    execSync('npx gulp', { stdio: 'inherit' });
  });

  test(`Plugin should generate log files if options.logToFile set to true.
  Check './__test__/temp' directory for outputs.`, () => {
    expect(existsSync('./__test__/temp/vnu-json.log')).toBe(true);
  });
});
