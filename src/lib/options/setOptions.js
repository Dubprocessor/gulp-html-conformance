const PluginError = require('plugin-error');

const setVnuOptions = require('./setVnuOptions');
const setHtmlhintOptions = require('./setHtmlhintOptions');

function setOptions(opts) {
  let options = {
    logToFile: false,
    vnu: {
      format: 'json'
    },
    htmlhint: {}
  };

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
