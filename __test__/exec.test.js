jest.mock('../src/lib/logger/logger');
const execCallback = require('../src/lib/execCallback');

const handleMessages = jest.fn(require('../src/lib/handleMessages'));
const PluginError = require('plugin-error');

describe('', () => {
  const opts = {
    vnu: {
      Werror: true
    }
  };
  const file = {
    history: ['/path/.file']
  };
  const e = new Error('mock internal vnu error');
  e.code = 2;
  const stdout = '';
  let stderr = '';
  const hint = [];

  test('through2 cb should be called with PluginError if vnu returns error with code !== 1', () => {
    const cb = jest.fn();
    execCallback(e, stdout, stderr, opts, cb, hint);
    expect(cb).toBeCalledWith(
      new PluginError('gulp-html-conformance', `${stdout}${stderr}${e.message}`)
    );
  });
  test('through2 cb should be called with PluginError if vnu.Werror set to true', () => {
    const cb = jest.fn();
    e.code = 1;
    stderr = JSON.stringify({
      messages: []
    });
    execCallback(e, stdout, stderr, opts, cb, file, hint);
    expect(cb).toBeCalledWith(
      new PluginError(
        'gulp-html-conformance',
        'Exited on error due to vnu option Werror set to true..',
        handleMessages
      )
    );
  });

  test('through2 cb should be called with file', () => {
    const cb = jest.fn();
    opts.vnu.Werror = false;
    e.code = 1;
    stderr = JSON.stringify({
      messages: []
    });
    execCallback(e, stdout, stderr, opts, cb, file, hint);
    expect(cb).toBeCalledWith(undefined, file);
  });
});
