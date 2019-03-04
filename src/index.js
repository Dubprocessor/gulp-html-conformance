const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const through = require('through2');
const PluginError = require('plugin-error');
const HTMLHint = require('htmlhint').default;

const logger = require('./lib/logger/logger');
const setOptions = require('./lib/options/setOptions');
const createCmd = require('./lib/createCmd');
const createFileTransport = require('./lib/logger/createFileTransport');
const execCallback = require('./lib/execCallback');

module.exports = function gulpHtmlConformance(opts = {}) {
  const options = setOptions(opts);
  const vnuCmd = createCmd(options);

  createFileTransport(options, logger);

  return through.obj(async function _(file, _enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-html-conformance', 'Stream is not supported!'));
    }
    if (file.isBuffer()) {
      const hinted = HTMLHint.verify(`${file.contents.toString('utf-8')}`, options.htmlhint);
      const { error, stdout, stderr } = await exec(`${vnuCmd}${file.history}`).catch(e => e);

      execCallback(error, stdout, stderr, options, cb, file, hinted);
    }
    return undefined;
  });
};
