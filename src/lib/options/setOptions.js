const PluginError = require('plugin-error');
const setVnuOptions = require('./setVnuOptions');
const setHtmlhintOptions = require('./setHtmlhintOptions');
const defaultOptions = require('./defaulOptions');

function setOptions(opts) {
  let options = defaultOptions;

  Object.keys(opts).forEach(key => {
    if (key === 'logToFile') {
      options[key] = opts[key];
    } else if (key === 'vnu') {
      options = setVnuOptions(opts, options);
    } else if (key === 'htmlhint') {
      options = setHtmlhintOptions(opts, options);
    } else {
      throw new PluginError('gulp-html-conformance', `Unknown key - "${key}" in options`);
    }
  });
  return options;
}

module.exports = setOptions;
