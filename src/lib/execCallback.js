const PluginError = require('plugin-error');
const handleMessages = require('./handleMessages');

module.exports = function execCallback(error, stdout, stderr, options, cb, file, hinted) {
  if (error && error.code !== 1) {
    return cb(new PluginError('gulp-html-conformance', `${stdout}${stderr}${error.message}`));
  }
  if (options.vnu.Werror === true) {
    return cb(
      new PluginError(
        'gulp-html-conformance',
        'Exited on error due to vnu option Werror set to true..',
        handleMessages(stderr, file.history[0], hinted)
      )
    );
  }

  return cb(handleMessages(stderr, file.history[0], hinted), file);
};
