const { existsSync } = require('fs');
const PluginError = require('plugin-error');

function setVnuOptions(opts, options) {
  const assigned = options;
  const allVnuKeys = [
    'errors-only',
    'Werror',
    'exit-zero-always',
    'asciiquotes',
    'user-agent',
    'no-langdetect',
    'no-stream',
    'filterfile',
    'filterpattern',
    'css',
    'skip-non-css',
    'also-check-css',
    'svg',
    'skip-non-svg',
    'also-check-svg',
    'html',
    'skip-non-html',
    'format',
    'help',
    'verbose',
    'version'
  ];
  const nonBooleanKeys = ['format', 'user-agent', 'filterfile', 'filterpattern'];

  Object.keys(opts.vnu).forEach(key => {
    if (allVnuKeys.indexOf(key) === -1) {
      throw new PluginError('gulp-html-conformance', `Unknown key - '${key}' in vnu options`);
    }
    if (typeof opts.vnu[key] !== 'boolean' && nonBooleanKeys.indexOf(key) === -1) {
      throw new PluginError(
        'gulp-html-conformance',
        `Bad value in vnu options. Usage - '${key}': boolean`
      );
    }
    if (typeof opts.vnu[key] === 'boolean' && nonBooleanKeys.indexOf(key) === -1) {
      assigned.vnu[key] = opts.vnu[key];
    }
    if (key === 'version') {
      assigned.vnu.version = false;
    }
    if (key === 'verbose') {
      assigned.vnu.verbose = false;
    }
    if (key === 'format') {
      assigned.vnu.format = 'json';
    }
    if (key === 'user-agent') {
      assigned.vnu['user-agent'] = 'Validator.nu/LV';
    }
    if (key === 'filterfile') {
      if (existsSync(opts.vnu.filterfile)) {
        assigned.vnu.filterfile = opts.vnu.filterfile;
      } else {
        throw new PluginError(
          'gulp-html-conformance',
          `Bad value for "filterfile" in vnu options.
           Could not open file ${opts.vnu.filterfile}`
        );
      }
    }
    if (key === 'filterpattern') {
      if (opts.vnu.filterpattern.includes('.*')) {
        assigned.vnu.filterpattern = opts.vnu.filterpattern;
      } else {
        throw new PluginError(
          'gulp-html-conformance',
          `Bad value for "filterpattern" in vnu options.
           Usage - filterpattern: '.*some word.*'`
        );
      }
    }
  });
  return assigned;
}
module.exports = setVnuOptions;
